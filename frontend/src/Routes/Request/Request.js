import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import axios from 'axios';

import RequestListGroup from './components/RequestListGroup';

class Requests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchCriteria: "",
            requestsList: [],

        }
        //stateful function binders
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.filterRequests = this.filterRequests.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/request/`)
            .then(res => {
                this.setState({
                    requestsList: res.data
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    matchesSearch(request, search) {
        search = search.toLowerCase();

        if (request.taskTitle.toLowerCase().includes(search)
            || request.taskDescription.toLowerCase().includes(search)
            || request.status.toLowerCase().includes(search)) {
            return true;
        }
        
        for (const rewardIndex in request.rewards) {
            if (request.rewards[rewardIndex].rewardItem.includes(search)) {
                return true;
            }
        }

        return false;
    }

    filterRequests(criteria) {
        let results = []
        let requestsList = this.state.requestsList;
        for (const request in requestsList) {
            let requestObj = requestsList[request];
            if (this.matchesSearch(requestObj, criteria)) {
                results.push(requestObj);
            }
        }
        return results;
    }

    handleSearchBarChange(event) {
        this.setState({ searchCriteria: event.target.value });
    }



    render() {
        return (
            <div className="page-content-container">
                <div className="requests-header">
                    <h1>Requests</h1>
                    <form action='/requests/' className="searchbar" noValidate autoComplete="off">
                        <TextField name="search" id="standard-basic" label="Search🔎" onChange={this.handleSearchBarChange} />
                    </form>

                </div>

                <RequestListGroup requestsList={this.filterRequests(this.state.searchCriteria)} />
            </div>
        );
    }
}

export default Requests;
