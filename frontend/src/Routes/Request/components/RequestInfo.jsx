import React, { Component } from 'react';
import axios from "axios";
import RewardsTable from './RewardsTable';
import { getCurrentYYYYMMDDDate } from '../../../Helpers/dateFormatter';

class RequestInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            taskTitle: "",
            taskDescription: "",
            timeCreated: "",
            requestExpiry: "",
            rewards: [],
            requestChanges: {}
        };

        this.handleSubmitRequest = this.handleSubmitRequest.bind(this);
        this.handleDeleteReward = this.handleDeleteReward.bind(this);
        this.saveRequestUpdates = this.saveRequestUpdates.bind(this);
        this.updateRequestChanges = this.updateRequestChanges.bind(this);
    }

    componentDidMount = async () => {
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

    handleSubmitRequest(event) {
        event.preventDefault();
        console.log('SUBMIT REQUEST HIT');
        console.log(this.state.rewards);
    }

    handleDeleteReward(index) { // update state and request object
        let rewards = this.state.rewards;
        rewards.splice(index, 1);
        this.setState({rewards: rewards});

        this.updateRequestChanges("rewards", this.state.rewards);

        this.saveRequestUpdates();
    }

    updateRequestChanges(fieldName, value) {
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

            axios.patch(`/api/request/update/`, payload)    // get request by id
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
                    handleChangeReward={this.handleChangeReward}
                    handleDeleteReward={this.handleDeleteReward}
                    handleSubmit={this.handleSubmitRequest}
                    />

            </div>  
        )
    }   
}               

export default RequestInfo;
