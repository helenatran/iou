import React, { Component } from 'react';
import Card from "@material-ui/core/Card";


class RequestDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {} 
    }



    render() { 
        console.log('RENDER: recieved request detail: ' + this.props.requestDetails);
        return (
            <Card>
                {this.props.requestDetails.taskTitle + " and " + this.props.requestDetails.taskDescription}
            </Card>
        );
    }
}
 
export default RequestDetails;