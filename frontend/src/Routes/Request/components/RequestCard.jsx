import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class RequestCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    renderSmallCaps = (text) => {
        return (<span className="smallCaps">{text}</span>);
    }

    renderCardInfo = (text) => {
        return (<p className="card-title">{text}</p>);
    }

    renderRewardInfo() {
        let rewards = this.props.requestInfo.rewards;
        let rewardsInfo = rewards[0].rewardItem;

        if (rewards.length > 1) {
            rewardsInfo += " & " + (rewards.length-1) + " other rewards";
        }

        return this.renderCardInfo(rewardsInfo);
    } 

    render() { 
        let requestInfo = this.props.requestInfo;
        return ( 
            <Card className="request-card">
                {this.renderSmallCaps("Request:")}
                {this.renderCardInfo(requestInfo.taskTitle)}
                
                {this.renderSmallCaps("Rewards (" + requestInfo.rewards.length + "):")}
                {this.renderRewardInfo()} 
                <Link to={requestInfo._id}>
                    <Button  variant="contained" color="primary" > View Request </Button>
                </Link>
            </Card>
         );
         // TODO - style spacing so that the height of cards are the same
    }
}
 
export default RequestCard;