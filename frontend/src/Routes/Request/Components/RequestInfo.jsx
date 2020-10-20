import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';

import axios from "axios";
import getToken from "../../../Helpers/getToken";
import RewardsTable from './RewardsTable';
import FavourFormProofUpload from '../../Favour/Components/FavourFormComponents/FavourFormProofUpload';
import { getCurrentYYYYMMDDDate } from '../../../Helpers/dateFormatter';

class RequestInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            id: this.props.match.params.id,
            userName: "",
            taskTitle: "",
            taskDescription: "",
            requesterUserId: "",
            timeCreated: "",
            requestExpiry: "",
            status: "",
            proof: "",
            proofUrl: "",
            proofConfirmation: "",  // file name
            completerUserId: "",
            rewards: [],            
            /** reward object in this array includes rewarderId and rewardItem 
             * - if request is has completed status: favour Id of related favour
             */
            requestChanges: {}
        };

        //TODO - ONLY EVENT HANDLER FUNCTIONS NEED TO BE BOUND
        this.handleDeleteReward = this.handleDeleteReward.bind(this);
        this.handleAddReward = this.handleAddReward.bind(this);
        
        this.handleChangeProof = this.handleChangeProof.bind(this);
        this.handleSubmitProof = this.handleSubmitProof.bind(this);
        
        this.saveRequestUpdates = this.saveRequestUpdates.bind(this);
        this.updateRequestChanges = this.updateRequestChanges.bind(this);
    }

    componentDidMount = async () => {
        const token = getToken();
        this.setState({userId: token !== null ? token.id : null})

        const { id } = this.state
        axios.get(`/api/request/${id}`)    // get request by id
        .then(res => {
            this.setState({
                taskTitle: res.data.taskTitle,
                taskDescription: res.data.taskDescription,
                requesterUserId: res.data.requesterUserId,
                timeCreated: res.data.timeCreated,
                requestExpiry: res.data.requestExpiry,
                rewards: res.data.rewards,
                status: res.data.status,
                proof: res.data.proof,
                proofConfirmation: res.data.proofConfirmation
            });
        })
        .catch((error) => {
            console.log(error);
        })
        
        if (this.state.userId !== null) {
            axios.post('/api/user/name', null, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            }).then(res => {
                this.setState({
                    userName: res.data
                })
            })
            .catch(error =>
                console.log(error)
            )
        }
        

    }

    handleChangeProof(event) {
        this.setState({
            proof: event.target.files[0],
            proofConfirmation: event.target.files[0].name
        })
    }

    handleAddReward(newReward) {
        // make request object and update state
        const rewardObj = {
            rewarderId: this.state.userId,
            rewarderName: this.state.userName,
            rewardItem: newReward
        }
        let rewards = this.state.rewards.concat(rewardObj);
        this.setState({rewards: rewards});

        this.updateRequestChanges("rewards", this.state.rewards);
        this.saveRequestUpdates();
    }

    handleDeleteReward(index) { // update state and request object
        let rewards = this.state.rewards;
        if (rewards.length === 1) {
            axios.delete(`/api/request/delete/${this.state.id}`)
            .then(window.location = '/')
            .catch(err => {
                console.log(err);
            })
        }
        else {
            rewards.splice(index, 1);
            this.setState({rewards: rewards});
            this.updateRequest("rewards", this.state.rewards)
        }
    }
    
    async handleSubmitProof(event) {
        event.preventdefault();
        if (this.state.proof) {
            //save to uploads collection
            const data = new FormData();
            data.append("file", this.state.proof, this.state.proofConfirmation);

            await axios.post('/api/proof/upload', data)
            .then((response) => {
                this.setState({
                    proofUrl: response.data.data.Location
                })
                console.log(response);
                console.log(this.state.proofUrl);

                this.completeRequest();
            })
            .catch(err => console.log(err));
        }
    }

    addFavourIdToReward(favourId, rewardIndex) {
        let rewards = this.state.rewards;
        rewards[rewardIndex]["favourId"] = favourId;
        this.setState({rewards: rewards});
    }

    async makeFavour(payload, rewardIndex) {
        let url = this.state.oweMe ? '/api/favours/withProof' : '/api/favours';

        await axios.post(url, payload, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
        .then(response => {
            console.log(response);
            console.log(response.data)
            this.addFavourIdToReward(response._id, rewardIndex);
        })
        .catch(err => {
            const error = err.response.data.error;
            console.log(err.response.data.error);
            this.setState({
                error: error,
                errorState: true
            })
        })
        console.table(this.state.rewards);
    }

    makeRewardFavoursOnRequestCompletion() {
        for (const rewardIndex in this.state.rewards) {
            const reward = this.state.rewards[rewardIndex];
            const favourPayload = {
                userId: reward.rewarderId,
                oweUserId: this.state.completerUserId,
                favourName: reward.rewardItem,
                oweMe: true,
                proof: this.state.proofUrl
            }

            this.makeFavour(favourPayload, rewardIndex);
        }
    }
    
    updateRequestChanges(fieldName, value) {
        let requestChanges = this.state.requestChanges;
        requestChanges[fieldName] = value;
        this.setState({requestChanges: requestChanges});
    }
    
    completeRequest() {
        //if OK request status, udpdate request and mark 
        this.updateRequestChanges("proof", this.state.proofUrl);
    
        this.setState({status: "Closed"})
        this.updateRequestChanges("status", this.state.status);
        
        this.saveRequestUpdates(this.makeRewardFavoursOnRequestCompletion);
    }   

    saveRequestUpdates(onRequestClosureFunction) {
        const { requestChanges } = this.state;

        if (Object.keys(requestChanges).length !== 0) {
            const payload = {
                _id: this.state.id,
                requestChanges: requestChanges
            }

            axios.patch(`/api/request/update/`, payload)
            .then(res => {
                console.log(res);
                if (onRequestClosureFunction) {
                    onRequestClosureFunction();
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    isLoggedIn() {
        return getToken() !== null;
    }

    userIsRequester() { 
        if (this.isLoggedIn()) {
            return getToken().id === this.state.requesterUserId;
        }
        return false;
    }

    userIsRewarder() {
        if (this.isLoggedIn()) {
            for (const rewardIndex in this.state.rewards) {
                const reward = this.state.rewards[rewardIndex];
                if (reward.rewarderId === getToken().id) {
                    return true;
                }
            }
        }
        return false;
    }

    renderProofUploadForm() {
        const status = this.state.status;
        if (status === "Expired" || status === "Closed"){ 
            return (
                <div>This request is {status} and can no longer be completed.</div>
            );
        }
        if (this.isLoggedIn()) {
            if (this.userIsRequester()) { //dont show form
                return (
                    <div>You cannot complete your own request.</div>
                );
            } 
            else if (this.userIsRewarder()) { //dont show form
                return (
                    <div>
                        You cannot complete a request where you have promised reward(s).
                        <br/>
                        Remove your rewards to complete this request.    
                    </div>
                );
            }
            else { // is unrelated logged in user, show form
                return (
                    <form onSubmit={this.handle}>
                        <FavourFormProofUpload updateProof={this.handleChangeProof} proofConfirmation={this.state.proofConfirmation} />
                        <Button 
                            onClick={this.handleSubmitProof} 
                            disabled={this.state.proof === undefined}
                            variant="contained" 
                            color="primary" 
                            size="small"
                        >
                            Submit Proof and<br/>Complete Request
                        </Button>
                    </form>
                );
            }
        }
        else {
            return (
                <div>
                    Log in or Register to be able to complete requests and get rewards,    
                </div>
            );
        }
    }

    render() {
        const {taskTitle, taskDescription, requesterUserId, timeCreated, requestExpiry, status} = this.state;
        return (
            <Card className="request-info">  
                <div className="centered">
                    Request: {taskTitle}
                    <br/>
                    Description: {taskDescription}
                    <br/>
                    Requested by: {requesterUserId}
                    <br/>
                    Created: {getCurrentYYYYMMDDDate(timeCreated)}
                    <br/>
                    Request expires on {getCurrentYYYYMMDDDate(requestExpiry)} 
                    <br/>
                    Status: <span className={"status smallCaps " + status}>{status}</span>
                    <br/>
                    rewards table: 
                    <RewardsTable 
                        rewards={this.state.rewards}
                        handleDeleteReward={this.handleDeleteReward}
                        handleAddReward={this.handleAddReward}
                        />

                    {this.renderProofUploadForm()}
                    <br/>
                    <Link to={'/requests'}><Button variant="contained">Back to all Requests</Button></Link>
                </div>
            </Card>  
        )
    }   
}               

export default RequestInfo;
