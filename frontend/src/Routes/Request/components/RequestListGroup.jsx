import React, { Component } from "react";
// import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";

import RequestCard from './RequestCard';
import "./RequestStyles.css";
// import { getAllRequests } from "../../../../../backend/controllers/requestController";

// const axios = require('axios');

class RequestListGroup extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

//   useEffect(() => {
//     axios.get("/api/requests/viewrequests")
//     .then(function(res) {
//         console.log(res)
//     }).
//     catch(function(ex) {
//         console.log(ex);
//     });
//   }, [input]);

    // componentDidMount() {
    //     //send get request to api to get list of request objects via axios.get
    //     console.log(this.props.value);
    //     axios.get("/api/requests/viewrequests")
    //     .then(function(res) {
    //         console.log(res)
    //     }).
    //     catch(function(ex) {
    //         console.log(ex);
    //     });
    // }

    /**
     * filterObject param {
     *      search: "",
     *      filterSelection: "" 
     * }
     * 
     * Returns list of filters
     */
    // getAllRequests(filterObject) {
    //     console.log(filterObject);
    // }

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
