import React, { Component } from 'react';
import axios from "axios";


class RequestInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            taskTitle: '',
            taskDescription: '',
            timeCreated: '',
            requestExpiry: '',
            rewards: [],
        };
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

 
    render() {
        const {taskTitle, taskDescription, timeCreated, requestExpiry, rewards} = this.state
        return (

            <div>  
                Request: {taskTitle}
                <br/>
                Description: {taskDescription}
                <br/>
                Request expires on {requestExpiry} 
                <br/>
                Rewards: 
                <ul>
                    {this.state.rewards.map((reward) => <li key={reward.rewarderId}>{reward.rewardItem}</li>)}
                </ul>
            </div>  

        )
        // TODO - get the name of the user in reward
        // TODO - render the date better - ie. "Request expires on Wednesday 14th OCtober (5 days left)"
        // TODO - styling
    } 
}               

export default RequestInfo;
