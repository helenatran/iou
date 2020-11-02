import React, { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';

import axios from "axios";
import ErrorNotice from '../../Errors/Error';
import RewardsTable from './RewardsTable';
import FavourFormProofUpload from '../../Favour/Components/FavourFormComponents/FavourFormProofUpload';
import UserContext from "../../../Context/userContext";

const RequestInfo = () => {
    const { userDetails } = useContext(UserContext); 

    const [error, setError] = useState([]);
    const [errorState, setErrorState] = useState(false);

    const getRequestId = () => {
        let path = window.location.pathname.split('/');
        return path[path.length-1];
    };

    const requestId = getRequestId()
        
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [status, setStatus] = useState('');
    const [rewards, setRewards] = useState([]);
    const [requesterUserId, setRequesterUserId] = useState('');
    const [proof, setProof] = useState('');
    const [proofUrl, setProofUrl] = useState('');
    const [proofConfirmation, setProofConfirmation] = useState('');
    const [completerUserId, setCompleterUserId] = useState('');

    const [requestChanges, setRequestChanges] = useState({});

    const isLoggedIn = () => userDetails.user ? true : false;

    useEffect( () => {
        //load request info
        let isSubscribed = true;
        async function loadRequest() {
            await axios.get(`/api/request/${requestId}`)
            .then(res => {
                if (isSubscribed) {
                    setTaskTitle(res.data.taskTitle);
                    setTaskDescription(res.data.taskDescription);
                    setRequesterUserId(res.data.requesterUserId);
                    setStatus(res.data.status);
                    setRewards(res.data.rewards);
                    setProof(res.data.proof);
                    setProofConfirmation(res.data.proofConfirmation);
                }
            })
            .catch((err) => {
                if (isSubscribed) {
                    const error = err.response.error;
                    setError(error);
                    setErrorState(true);
                }
            });
        }
        loadRequest();

        //cleanup
        return () => (isSubscribed = false);
    }, []);
    
    // add any updates that change into requestChanges state
    const updateRequestChanges = (fieldName, value) => {
        let newRequestChanges = requestChanges;
        newRequestChanges[fieldName] = value;
        setRequestChanges(newRequestChanges);
    }

    // makes web request to save any updates accumulated in requestChanges state
    const saveRequestUpdates = (onRequestClosureFunction) => {
        if (Object.keys(requestChanges).length > 0) {
            const payload = {
                _id: requestId,
                requestChanges: requestChanges
            }

            axios.patch(`/api/request/update/`, payload, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            })
            .then(res => {
                if (onRequestClosureFunction) { // extra actions for when request closes
                    onRequestClosureFunction();
                }
            })
            .catch(err => {
                const error = err.response.data.error;
                setError(error);
                setErrorState(true);
            })
        }
    }

    //add reward - newReward: String - reward/favour type
    const addReward = (newReward) => {
        const rewardObj = {
            rewarderId: userDetails.user.id,
            rewarderName: userDetails.user.firstName,
            rewardItem: newReward
        }
        let newRewards = rewards.concat(rewardObj);
        setRewards(newRewards);
        updateRequestChanges("rewards", rewards);
        saveRequestUpdates();
    }

    //delete reward - indexKey:number - index of the reward to delete in rewards array
    const deleteReward = (indexKey) => {
        if (rewards.length === 1) { // if last reward is deleted, delete request too
            axios.delete(`/api/request/delete/${requestId}`, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            })
            .then(window.location = '/')
            .catch(err => {
                console.log(err);
            })
        }
        else {
            const newRewards = [...rewards];
            newRewards.splice(indexKey, 1);
            setRewards(newRewards);

            updateRequestChanges("rewards", rewards);
            saveRequestUpdates();
        }
    }

    //change proof
    const handleChangeProof = (e) => {
        const file = e.target.files[0];
        setProof(file);
        setProofConfirmation(file.name);
    }

    //submit proof
    const handleSubmitProof = (e) => {
        e.preventDefault();
        if (proof) {
            //save to uploads collection
            const data = new FormData();
            data.append("file", proof, proofConfirmation);

            axios.post('/api/proof/upload', data)
            .then((response) => {
                setProofUrl(response.data.data.Location)
                
                completeRequest();
            })
            .catch(err => console.log(err));
        }
    }

    //complete request 
    const completeRequest = (e) => {
        setStatus("Closed");
        setCompleterUserId(userDetails.user.id);

        updateRequestChanges("status", status);
        updateRequestChanges("completerUserId", completerUserId);
        updateRequestChanges("proofUrl", proofUrl);

        saveRequestUpdates(generateFavours);
    }

    //generate favours for each reward in the newly closed request
    const generateFavours = () => {
        for (const rewardIndex in rewards) {
            const reward = rewards[rewardIndex];
            const favourPayload = {
                userId: reward.rewarderId,
                oweUserId: completerUserId,
                favourName: reward.rewardItem,
                favourComment: `for completing the request "${taskTitle}"`,
                oweMe: true,
                proof: proofUrl
            }
            makeFavour(favourPayload);
        }
    }

    //make favour - helper function 
    const makeFavour = (favourPayload) => {
        let url = '/api/favours/withProof';

        axios.post(url, favourPayload, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
        .catch(err => {
            const error = err.response.data.error;
            setError(error);
            setErrorState(true);
        })
    }

    // checks if the current logged in user has promised a reward to this request
    const isRewarder = () => {
        if (rewards.length > 0) {
            for (const rewardIndex in rewards) {
                const reward = rewards[rewardIndex];
                if (reward.rewarderId === requesterUserId) {
                    return true
                }
            }
        }
        return false;
    };

    // checks if request belongs to current logged in user
    const isRequester = () => (isLoggedIn() && (userDetails.user.id === requesterUserId));

    // extra conditions check for rendering proof upload form
    const renderProofUploadForm = () => {
        if (status === "Closed") { //show proof
            return ( 
                <>
                    <div>This request is Closed and can no longer be completed.
                    <br/>
                    Proof: <a href={proofUrl}>Image Link</a></div>
                    <img width="60%" src={proofUrl} alt="Request Completion Proof"/>
                </>  
            );
        }
        if (isLoggedIn()) {
            if (isRequester()) { //dont show form
                return (
                    <div>You cannot complete your own request.</div>
                );
            } 
            else if (isRewarder()) { //dont show form
                return (
                    <div>
                        You cannot complete a request where you have promised reward(s).
                        <br/>
                        Remove your rewards to complete this request.    
                    </div>
                );
            }
            else { // is logged in user, unrelated to request, show form
                return (
                    <div>
                        <FavourFormProofUpload updateProof={handleChangeProof} proofConfirmation={proofConfirmation} />
                        <Button 
                            onClick={handleSubmitProof} 
                            disabled={proof === undefined}
                            variant="contained" 
                            color="primary" 
                            size="small"
                        >
                            Submit Proof and<br/>Complete Request
                        </Button>
                    </div>
                );
            }
        }
        else {
            return (
                <div>
                    Log in or Register to be able to complete requests and get rewards,    
                </div>
            );
        }
    }

    return (
        <Card className="request-info">  
            {errorState === true ? <ErrorNotice message={error} /> : ""}
            <div className="centered">
                Request: {taskTitle}
                <br/>
                Description: {taskDescription}
                <br/>
                Status: <span className={"status smallCaps " + status}>{status}</span>
                <br/>
                rewards table: 
                <RewardsTable 
                    requestStatus={status}
                    rewards={rewards}
                    handleDeleteReward={deleteReward}
                    handleAddReward={addReward}
                    />

                {renderProofUploadForm()}
                <br/>
                <Link to={'/requests'}><Button variant="contained">Back to all Requests</Button></Link>
            </div>
        </Card>  
    );
}         

export default RequestInfo;
