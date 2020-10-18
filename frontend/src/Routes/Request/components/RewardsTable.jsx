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

// const axios = require('axios');

class RewardsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rewards: [],
            newReward: "",
        }

        this.onChangeNewReward = this.onChangeNewReward.bind(this);
    }
    
    componentDidMount() {
        // load Rewards into changeable state
        this.setState({rewards: this.props.rewards});
    }

    onChangeNewReward(event) {
        this.setState({
            newReward: event.target.value
        });
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
                                            <Button onClick={(event) => {
                                                this.props.handleDeleteReward(indexKey);
                                            }
                                            } aria-label="delete">
                                                <DeleteIcon color="action" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>    
                    </Table>

                    <form onSubmit={this.props.handleSubmit}>

                        <label>Select a Reward to add: </label>
                        <RewardSelectField handleChangeReward={this.handleChangeReward} />

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