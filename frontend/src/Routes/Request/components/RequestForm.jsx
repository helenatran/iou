import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

import RewardsTable from "./RewardsTable";
import "./RequestStyles.css";
import getToken from "../../../Helpers/getToken";

const axios = require('axios');

class RequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskTitle: "",
            taskDescription: "",
            userId: "",
            requestExpiry: new Date(),
            rewards: [],
            newRewardObj: {}
        };

        //event handler bindings
        this.handleChangeTaskTitle = this.handleChangeTaskTitle.bind(this);
        this.handleChangeTaskDescription = this.handleChangeTaskDescription.bind(this);
        this.handleChangeExpiry = this.handleChangeExpiry.bind(this);
        this.handleAddReward = this.handleAddReward.bind(this);
        this.handleDeleteReward = this.handleDeleteReward.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const token = getToken();
        this.setState({userId: token !== null ? token.id : null})
    }

    handleChangeTaskTitle(event) { 
        this.setState({ taskTitle: event.target.value });
    }

    handleChangeTaskDescription(event) {
        this.setState({ taskDescription: event.target.value });
    }
    
    handleChangeExpiry(event) { 
        this.setState({ requestExpiry: event.target.value });
    }
    
    // === rewards table functions ===
    handleAddReward(newReward) { 
        const rewardObj = {
            rewarderId: getToken().id,
            rewardItem: newReward
        }
        let rewards = this.state.rewards.concat(rewardObj);
        this.setState({rewards: rewards});
    }

    handleDeleteReward(index) {
        let rewards = this.state.rewards;
        rewards.splice(index, 1);
        this.setState({rewards: rewards});
        console.log("delete reward" + index);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newRequest = {
            taskTitle: this.state.taskTitle,
            taskDescription: this.state.taskDescription,
            requestExpiry: this.state.requestExpiry,
            status:"Open",
            rewards: this.state.rewards,
            requesterUserId: this.state.userId
        }
        axios.post('/api/request/create', newRequest, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(response => {
                window.location = '/request'
            })
            .catch(err => console.log(err));
        
    }

    isLoggedIn() {
        return this.state.userId != null; 
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
                        
                        <RewardsTable 
                            rewards={this.state.rewards}
                            handleDeleteReward={this.handleDeleteReward}
                            handleAddReward={this.handleAddReward}
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
