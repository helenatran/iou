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

    renderStatus = () => {
        let status = this.props.request.status;
        return (<span className={"status smallCaps " + status}>{status}</span>);
    }

    renderRewardInfo() {
        let rewards = this.props.request.rewards;
        let rewardsInfo;
        if (rewards.length === 0)
            rewardsInfo = "No rewards";
        else if (rewards.length === 1)
            rewardsInfo = this.props.request.rewards[0].rewardItem;
        else if (rewards.length === 2) {
            rewardsInfo = this.props.request.rewards[0].rewardItem;
            rewardsInfo += " & " + (rewards.length-1) + " other reward";
        }
        else if (rewards.length > 2) {
            rewardsInfo = this.props.request.rewards[0].rewardItem;
            rewardsInfo += " & " + (rewards.length-1) + " other rewards";
        }
        return this.renderCardInfo(rewardsInfo);
    } 

    render() { 
        let request = this.props.request;
        return ( 
            <Card className="request-card">
                {this.renderSmallCaps("Request: ")} 
                {this.renderStatus()}
                {this.renderCardInfo(request.taskTitle)}
                
                {this.renderSmallCaps("Rewards (" + request.rewards.length + "):")}
                {this.renderRewardInfo()} 
                <Link to={"/request/" + request._id}>
                    <Button  variant="contained" color="primary" > View Request </Button>
                </Link>
            </Card>
         );
         // TODO - style spacing so that the height of cards are the same
    }
}
 
export default RequestCard;