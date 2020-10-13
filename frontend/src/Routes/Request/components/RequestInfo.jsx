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
            rewards: '',
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
        const{taskTitle, taskDescription, timeCreated, requestExpiry, rewards} = this.state
        return (

            <div>  
                Request: {taskTitle}
                <br/>
                Description: {taskDescription}
                <br/>
                Complete by: {requestExpiry}
                <br/>
                Rewards: {rewards}
            </div>  

        )
    } 
}               

export default RequestInfo;
