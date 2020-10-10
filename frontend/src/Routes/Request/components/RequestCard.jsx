import React, { Component } from 'react';
import Card from '@material-ui/core/Card';

class RequestCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        let requestInfo = this.props.requestInfo;
        return ( 
            <Card className="request-card">
                <h4>{requestInfo.taskTitle}</h4>
                <p>{requestInfo.taskDescription}</p>
            </Card>
         );
    }
}
 
export default RequestCard;