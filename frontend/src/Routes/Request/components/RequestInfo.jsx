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
            rewards: []
        };

        this.handleSubmitRequest = this.handleSubmitRequest.bind(this);
        this.handleDeleteReward = this.handleDeleteReward.bind(this);

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

    handleDeleteReward(event) {
        console.log("HANDLE DELETE REWARD");
        console.log("*changes the reward array*");
        console.log(event.target.value);
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
                    handleSubmit={this.handleSubmitRequest}
                    />

            </div>  
        )
    }   
}               

export default RequestInfo;
