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
            taskTitle: "",
            taskDescription: "",
            requesterUserId: "",
            timeCreated: "",
            requestExpiry: "",
            status: "",
            proof: "",
            completerUserId: "",
            rewards: [],
            requestChanges: {}
        };

        //TODO - ONLY EVENT HANDLER FUNCTIONS NEED TO BE BOUND
        this.handleDeleteReward = this.handleDeleteReward.bind(this);
        this.handleAddReward = this.handleAddReward.bind(this);
        
        this.handleChangeProof = this.handleChangeProof.bind(this);
        this.handleSubmitProof = this.handleSubmitProof.bind(this);
        
        this.saveRequestUpdates = this.saveRequestUpdates.bind(this);
        this.updateRequest = this.updateRequest.bind(this);
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
            rewardItem: newReward
        }
        let rewards = this.state.rewards.concat(rewardObj);
        this.setState({rewards: rewards});

        this.updateRequest("rewards", this.state.rewards);
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
            this.updateRequestChanges("rewards", this.state.rewards)
        }
    }
    
    handleSubmitProof(event) {
        this.updateRequest("proof", this.state.proof);
        this.updateRequest("proofConfirmation", this.state.proofConfirmation);
        this.updateRequest("status", "Closed");
        
        this.saveRequestUpdates();
    }
    
    updateRequest(fieldName, value) {
        let requestChanges = this.state.requestChanges;
        requestChanges[fieldName] = value;
        this.setState({requestChanges: requestChanges});
    }

    saveRequestUpdates() {
        const { requestChanges } = this.state;

        if (Object.keys(requestChanges).length !== 0) {
            const payload = {
                _id: this.state.id,
                requestChanges: requestChanges
            }

            axios.patch(`/api/request/update/`, payload)
            .then(res => {
                console.log(res);
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
                    Log in or Register to be able to complete requests and get rewards    
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
