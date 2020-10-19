import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Link from 'react-router-dom/Link';

import axios from "axios";
import getToken from "../../../Helpers/getToken";
import RewardsTable from './RewardsTable';
import { getCurrentYYYYMMDDDate } from '../../../Helpers/dateFormatter';

class RequestInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            id: this.props.match.params.id,
            taskTitle: "",
            taskDescription: "",
            timeCreated: "",
            requestExpiry: "",
            rewards: [],
            requestChanges: {}
        };

        this.handleDeleteReward = this.handleDeleteReward.bind(this);
        this.saveRequestUpdates = this.saveRequestUpdates.bind(this);
        this.updateRequestChanges = this.updateRequestChanges.bind(this);
        this.handleSubmitReward = this.handleSubmitReward.bind(this);
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
                timeCreated: res.data.timeCreated,
                requestExpiry: res.data.requestExpiry,
                rewards: res.data.rewards,
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    handleSubmitReward(newReward) {
        // make request object and update state
        const rewardObj = {
            rewarderId: this.state.userId,
            rewardItem: newReward
        }
        let rewards = this.state.rewards.concat(rewardObj);
        this.setState({rewards: rewards});

        this.updateRequestChanges("rewards", this.state.rewards);
    }

    handleDeleteReward(index) { // update state and request object
        let rewards = this.state.rewards;
        if (rewards.length < 2) {
            console.log(this.state.id)
            //axios.post('/api/request/')
        }
        else {
            rewards.splice(index, 1);
            this.setState({rewards: rewards});
        }
        this.updateRequestChanges("rewards", this.state.rewards);
    }

    updateRequestChanges(fieldName, value) {
        let requestChanges = this.state.requestChanges;
        requestChanges[fieldName] = value;
        this.setState({requestChanges: requestChanges});

        this.saveRequestUpdates();
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
 
    render() {
        const {taskTitle, taskDescription, timeCreated, requestExpiry} = this.state;
        return (
            <div>  
                Request: {taskTitle}
                <br/>
                Description: {taskDescription}
                <br/>
                Created: {getCurrentYYYYMMDDDate(timeCreated)}
                <br/>
                Request expires on {getCurrentYYYYMMDDDate(requestExpiry)} 
                <br/>
                Rewards:
                <ul>
                    {this.state.rewards.map((reward) => <li key={this.state.rewards.indexOf(reward)}>{reward.rewardItem}</li>  )}
                </ul>
                rewards table: 
                <RewardsTable 
                    rewards={this.state.rewards}
                    handleDeleteReward={this.handleDeleteReward}
                    handleAddReward={this.handleSubmitReward}
                />
                <Link to={'/requests'}><Button variant="contained">Back to all Requests</Button></Link>
            </div>  
        )
    }   
}               

export default RequestInfo;
