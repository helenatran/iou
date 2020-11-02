import React, { useState, useEffect, useContext } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import ErrorNotice from '../../Errors/Error'
import RewardsTable from "./RewardsTable";
import "./RequestStyles.css";
import getToken from "../../../Helpers/getToken";
import UserContext from "../../../Context/userContext";


const axios = require('axios');

const RequestForm = () => {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const { userDetails } = useContext(UserContext); 

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const status = "Open";
    const [rewards, setRewards] = useState([]);


    const [error, setError] = useState([]);
    const [errorState, setErrorState] = useState(false);

    useEffect(() => {
        if(userDetails.user) {
            setUserId(userDetails.user.id);
            if (userDetails.user.firstName){
                setUserName(userDetails.user.firstName);
            }
        }
    });

    const handleSubmit = e => {
        e.preventDefault();
        
        setErrorState(false);

        const newRequest = {
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            status: status,
            rewards: rewards,
            requesterUserId: userId
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
            setError(error);
            setErrorState(true);
        })
    }

    const updateTaskTitle = e => {
        setTaskTitle(e.target.value);
    }
    
    const updateTaskDescription = e => {
        setTaskDescription(e.target.value);
    }

    const addReward = (newReward) => {
        const rewardObj = {
            rewarderId: getToken().id,
            rewarderName: userName,
            rewardItem: newReward
        }
        setRewards([...rewards, rewardObj]);
    }

    const deleteReward = (rewardIndex) => {
        let newRewards = rewards.splice(rewardIndex, 1);
        setRewards(newRewards);
    }

    const canSubmit = () => {
        return (taskTitle.length>0 && taskDescription.length>0 && rewards.length>0);
    }

    return (
        <div className="page-content-container">
                
                {errorState === true ? <ErrorNotice message={error} /> : ""}
                <h1>Create a New Request</h1>
                <Card>
                    <form className="request-form" onSubmit={handleSubmit}>
                        <TextField onChange={updateTaskTitle} label="Request" required id="standard-required" />
                        <br />
                        <TextField onChange={updateTaskDescription} label="Description" id="outlined-multiline-flexible" />
                        <br />
                        <br />

                        <label>Reward: </label>
                        
                        <RewardsTable 
                            requestStatus={status}
                            rewards={rewards}
                            handleDeleteReward={deleteReward}
                            handleAddReward={addReward}
                        />
                        <br />
                        <br />
                        <Button disabled={!canSubmit()} variant="contained" color="primary" type="submit">Create</Button>
                    </form>
                </Card>
                <Link to={'/'}><Button variant="contained">Back to all Requests</Button></Link>
            </div>
    );
}

export default RequestForm;
