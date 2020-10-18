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
import './RequestStyles.css';

class RewardsTable extends Component {
    constructor(props) {
        super(props);

        /**
         * props required:
         * rewards array ({rewarderId, rewardItem} elements)
         * handleDeleteReward function
         * handleSubmitReward(rewardSelection: string) function
        */

        this.state = {
            newReward: "",
        }

        this.handleChangeReward = this.handleChangeReward.bind(this);
    }

    handleChangeReward(event) {
        this.setState({newReward: event.target.value});
    }
    
    render() { 
        return ( 
            <><div className="rewards-table-container">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Rewards</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.rewards.map((rewardObj, i) => {
                                let indexKey = this.props.rewards.indexOf(rewardObj);
                                return (
                                    <TableRow key={indexKey}>
                                        <TableCell>
                                            {rewardObj.rewardItem} from {rewardObj.rewarderId}
                                        </TableCell>
                                        <TableCell>
                                            <Button 
                                                onClick={(event) => {this.props.handleDeleteReward(indexKey);}} 
                                                aria-label="delete"
                                            >
                                                <DeleteIcon color="action" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>    
                    </Table>

                    <form onSubmit={(event) => {
                        event.preventDefault();
                        this.props.handleSubmitReward(this.state.newReward);
                    }}>
                        <label>Select a Reward to add:   </label>
                        <RewardSelectField name="reward" handleChangeReward={this.handleChangeReward} />

                        <br/>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit"
                        >Add Reward</Button>
                    </form>
                </TableContainer>
            </div></>
        );
    }
}
 
export default RewardsTable;