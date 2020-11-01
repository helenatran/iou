import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import ErrorNotice from '../../Errors/Error'
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
            userName: "",
            status: "Open",
            rewards: [],
            newRewardObj: {},
            error: [],
            errorState: false,
        };

        //event handler bindings
        this.handleChangeTaskTitle = this.handleChangeTaskTitle.bind(this);
        this.handleChangeTaskDescription = this.handleChangeTaskDescription.bind(this);
        this.handleAddReward = this.handleAddReward.bind(this);
        this.handleDeleteReward = this.handleDeleteReward.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const token = getToken();
        this.setState({userId: token !== null ? token.id : null})
        
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

    handleChangeTaskTitle(event) { 
        this.setState({ taskTitle: event.target.value });
    }

    handleChangeTaskDescription(event) {
        this.setState({ taskDescription: event.target.value });
    }
    
    // === rewards table functions ===
    handleAddReward(newReward) { 
        const rewardObj = {
            rewarderId: getToken().id,
            rewarderName: this.state.userName,
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
        this.setState({ errorState: false })
        const newRequest = {
            taskTitle: this.state.taskTitle,
            taskDescription: this.state.taskDescription,
            status: this.state.status,
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
            .catch(err => {
                const error = err.response.data.error;
                this.setState({
                    error: error,
                    errorState: true
                })
            })
    }

    isLoggedIn() {
        return this.state.userId != null; 
    }

    render() {
        return (
            <div className="page-content-container">
                {this.state.errorState === true ? <ErrorNotice message={this.state.error} /> : ""}
                <h1>Create a New Request</h1>
                <Card>
                    <form className="request-form" onSubmit={this.handleSubmit}>
                        <TextField onChange={this.handleChangeTaskTitle} label="Request" required id="standard-required" />
                        <br />
                        <TextField onChange={this.handleChangeTaskDescription} required label="Description" id="outlined-multiline-flexible" />
                        <br />
                        <label>Reward: </label>
                        
                        <RewardsTable 
                            requestStatus={this.state.status}
                            rewards={this.state.rewards}
                            handleDeleteReward={this.handleDeleteReward}
                            handleAddReward={this.handleAddReward}
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
