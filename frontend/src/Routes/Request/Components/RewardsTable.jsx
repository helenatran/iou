import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import RewardSelectField from "./RewardSelectField";
import getToken from '../../../Helpers/getToken';

import './RequestStyles.css';

class RewardsTable extends Component {
    constructor(props) {
        super(props);

        /**
         * props required:
         * rewards array ({rewarderId, rewardItem} elements)
         * handleDeleteReward(indexkey) function
         * handleSubmitReward(rewardSelection: string) function
        */

        this.state = {
            newReward: ""
        }

        this.handleChangeReward = this.handleChangeReward.bind(this);
    }

    componentDidMount() {
        const token = getToken();
        this.setState({userId: token !== null ? token.id : null})
    }

    handleChangeReward(event) {
        this.setState({newReward: event.target.value});
    }

    isLoggedIn() {
        return this.state.userId != null; 
    }

    renderAddRewardForm() {
        if (this.isLoggedIn()) {
            if (this.props.requestStatus === "Open" ) {
                return (
                    <div>
                        <label>Select a Reward to add:   </label>
                        <RewardSelectField handleChangeReward={this.handleChangeReward} />

                        <br/>
                        <Button 
                            onClick={(event) => {
                                event.preventDefault();
                                this.props.handleAddReward(this.state.newReward);
                            }}
                            variant="contained" 
                            color="primary" 
                        >Add Reward</Button>
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <label>This request is {this.props.requestStatus} and can no longer have rewards added to it.</label>
                    </div>
                );
            }
        }
        else {
            return (
                <div>
                    <label>Login or register to add a reward. </label>
                </div>
            );
        }
    }
    

    isRewardByUser(indexKey) {
        return this.state.userId === this.props.rewards[indexKey].rewarderId;
    }

    renderDeleteRewardButton(indexKey) {
        if (this.props.requestStatus === "Open" && this.isLoggedIn() && this.isRewardByUser(indexKey)) {
            return (
                <Button 
                    onClick={(event) => {this.props.handleDeleteReward(indexKey);}} 
                    aria-label="delete"
                    data-testid="delete-reward-button"
                >
                    <DeleteIcon color="action" />
                </Button>
            );
        }
    }

    render() { 
        return ( 
            <><div className="rewards-table-container">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell data-testid="rewards-table-heading">Rewards</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.props.rewards.length === 0 
                                ?
                                    <TableRow>
                                        <TableCell colSpan={2}><p data-testid="no-rewards-text">There are no rewards yet. Select and Add a Reward below.</p></TableCell>
                                    </TableRow>
                                :
                                    this.props.rewards.map((rewardObj, i) => {
                                        let indexKey = this.props.rewards.indexOf(rewardObj);
                                        return (
                                            <TableRow data-testid="reward-row" key={indexKey}>
                                                <TableCell>
                                                    {rewardObj.rewardItem} from {rewardObj.rewarderName}
                                                </TableCell>
                                                <TableCell>
                                                    {this.renderDeleteRewardButton(indexKey)}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                            }
                        </TableBody>    
                    </Table>
                    {this.renderAddRewardForm()}
                </TableContainer>
            </div></>
        );
    }
}
 
export default RewardsTable;
