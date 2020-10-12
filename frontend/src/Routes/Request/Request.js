import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
// import ButtonGroup from "@material-ui/core/ButtonGroup";
// import Button from "@material-ui/core/Button";

import RequestListGroup from './components/RequestListGroup';
// import RequestDetails from './components/RequestDetails';

class Requests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: ['All open requests', 'Pending Confirmation Requests', 'Your Requests', 'pls'],
            searchCriteria: "",
            requestsList: [
                {
                    taskTitle: "my request",
                    taskDescription: "do this thing",
                    status: "Open",
                    requestExpiry: "2020-10-01T11:59:00",
                    rewards: [
                        {rewarder: "alice", reward: "2 chocolates"}
                    ]
                },
                {
                    taskTitle: "second request",
                    taskDescription: "do this other thing",
                    status: "Open",
                    requestExpiry: "2020-10-03T11:59:00",
                    rewards: [
                        {rewarder: "alice", reward: "2 chocolates"}, 
                        {rewarder: "bob", reward: "1 chocolate"},
                        {rewarder: "carol", reward: "1 tea drink"}
                    ]
                },
                {
                    taskTitle: "third request",
                    taskDescription: "do the chicken dance",
                    status: "Pending Confirmation",
                    requestExpiry: "2020-10-05T11:59:00",
                    rewards: [
                        {rewarder: "alice", reward: "2 chocolates"}, 
                        {rewarder: "bob", reward: "1 chocolate"}
                    ]
                }
            ]
        }

        //stateful function binders
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.filterRequests = this.filterRequests.bind(this);
    }

    matchesSearch(request, search) {
        search = search.toLowerCase();

        let rewardsIncludeSearch = false;
        for (const rewardIndex in request.rewards) {
            if (request.rewards[rewardIndex].reward.includes(search)){
                rewardsIncludeSearch = true;
                break
            }
        }
        
        return request.taskTitle.toLowerCase().includes(search) 
            || request.taskDescription.toLowerCase().includes(search)
            || request.status.toLowerCase().includes(search)
            || rewardsIncludeSearch;
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
        this.setState({searchCriteria: event.target.value});
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

                <RequestListGroup requestsList={this.filterRequests(this.state.searchCriteria)}/>
            </div> 
        );
    }
}
 
export default Requests;
