import React, { useContext } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import AddReward from "./AddReward";
import UserContext from "../../../Context/userContext";

import './RequestStyles.css';

const RewardsTable = (props) => {
    /**
     * props required:
     * rewards array ({rewarderId, rewarderName, rewardItem} elements)
     * handleDeleteReward(indexkey: int) function
     * handleSubmitReward(rewardSelection: string) function
    */
    const { userDetails } = useContext(UserContext); 

    function isLoggedIn() {
        return userDetails.user.id ? true : false;
    }

    // checks if the reward at the rewards[indexKey] belongs to the current logged in user
    function isRewardByCurrentUser(indexKey) {
        if (userDetails.user) {
            return userDetails.user.id === props.rewards[indexKey].rewarderId;
        }
        return false;
    }

    // renders delete button for each reward in the table
    const renderDeleteRewardButton = (indexKey) => {
        if (props.requestStatus === "Open" && isLoggedIn() && isRewardByCurrentUser(indexKey)) {
            return (
                <Button 
                    onClick={(event) => {props.handleDeleteReward(indexKey);}} 
                    aria-label="delete"
                >
                    <DeleteIcon color="action" />
                </Button>
            );
        }
    }

    // extra conditions for rendering add reward component
    const renderAddRewards = () => {
        if (isLoggedIn()) {
            if (props.requestStatus === "Open" ) {
                return (
                    <AddReward handleAddReward={props.handleAddReward}/>
                );
            }
            else {
                return (
                    <div>
                        <label>This request is {props.requestStatus} and can no longer have rewards added to it.</label>
                    </div>
                );
            }
        }
        else {
            return (
                <div>
                    <label>Login or register to add a reward.</label>
                </div>
            );
        }
    }

    return (
        <>
        <div className="rewards-table-container">
            <Card>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rewards</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.rewards.length === 0 
                            ?
                            <TableRow><h5>There are no rewards yet. Select and Add a Reward below</h5></TableRow>
                            :
                            props.rewards.map((rewardObj, i) => {
                                let indexKey = props.rewards.indexOf(rewardObj);
                                return (
                                    <TableRow key={indexKey}>
                                        <TableCell>
                                            {rewardObj.rewardItem} from {rewardObj.rewarderName}
                                        </TableCell>
                                        <TableCell>
                                            {renderDeleteRewardButton(indexKey)}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
                {renderAddRewards()}
            </Card>
        </div>
        </>
    );
}   

export default RewardsTable;
