import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

import { getCurrentYYYYMMDDDate } from '../../../Helpers/dateFormatter';
import RewardSelectField from "./RewardSelectField";
import "./RequestStyles.css";

const axios = require('axios');

class RequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskTitle: "",
            taskDescription: "",
            requesterUserId: "5f76f01f905dd3637d79a01d",
            requestExpiry: getCurrentYYYYMMDDDate(),
            rewards: [],
            newReward: {}
        };

        //event handler bindings
        this.handleChangeTaskTitle = this.handleChangeTaskTitle.bind(this);
        this.handleChangeTaskDescription = this.handleChangeTaskDescription.bind(this);
        this.handleChangeExpiry = this.handleChangeExpiry.bind(this);
        this.handleChangeRewardSelection = this.handleChangeRewardSelection.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        //TODO - check for user
    }

    handleChangeTaskTitle = (event) => { this.setState({ taskTitle: event.target.value }); }

    handleChangeTaskDescription = (event) => { this.setState({ taskDescription: event.target.value }); }
    
    handleChangeExpiry = (event) => { this.setState({ requestExpiry: event.target.value }); }
    
    handleChangeRewardSelection = (event) => { 
        this.setState({ newReward: {
            rewarderId: this.state.requesterUserId,
            rewardItem: event.target.value
        }});
    }

    componentDidUpdate() {
        console.log("state:")
        console.log(this.state);
        
    }


    handleSubmit = (event) => {
        event.preventDefault();
        const newRequest = {
            taskTitle: this.state.taskTitle,
            taskDescription: this.state.taskDescription,
            requestExpiry: this.state.requestExpiry,
            status:"Open",
            rewards: [].concat(this.state.newReward),
            requesterUserId: this.state.requesterUserId
        }
        console.log(newRequest);
        axios.post('/api/request/create', newRequest)
            .then(response => {
                console.log("create req response: ");
                console.log(response);
                console.log("New request ID");
                console.log(response.data._id);
                window.location = '/request/' + (response.data._id || "");
            })
            .catch(err => console.log(err));
        
    }

    render() {
        return (
            <div className="page-content-container">
                <h1>Create a New Request</h1>
                <Card>
                    <form className="request-form" onSubmit={this.handleSubmit}>
                        <TextField onChange={this.handleChangeTaskTitle} label="Request" required id="standard-required" />
                        <br />
                        <TextField onChange={this.handleChangeTaskDescription} label="Description" id="outlined-multiline-flexible" />
                        <br />
                        <br />

                        <label>Reward: </label>
                        
                        <RewardSelectField 
                            value={this.state.rewardSelection || ""} 
                            handleChangeRewardSelection={this.handleChangeRewardSelection}
                        />

                        <br/>
                        <br/>
                        <TextField
                            id="date"
                            label="Request Expiry"
                            onChange={this.handleChangeExpiry}
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br />
                        <br />
                        <Button variant="contained" color="primary" type="submit">Create</Button>
                    </form>
                </Card>
            </div>
        );
    }
}

export default RequestForm;
