import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";

import RequestCard from './RequestCard';
import "./RequestStyles.css";

class RequestListGroup extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <Paper elevation={5}>
                <div className="list-group-container">
                    {
                        this.props.requestsList.map(
                            (requestInfo) => (
                                <RequestCard key={requestInfo.taskTitle} requestInfo={requestInfo} />
                            )
                        ) 
                    }
                </div>
                </Paper>
            </React.Fragment>
        );
    }
}

export default RequestListGroup;
