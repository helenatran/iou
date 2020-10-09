import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
// import Card from '@material-ui/core/Card';

import RequestListGroup from './components/RequestListGroup';

class Requests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: ['All open requests', 'Pending Confirmation Requests', 'Your Requests', 'pls'],
            searchCriteria: '',
            requests: [
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
                        {rewarder: "bob", reward: "1 chocolate"}
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

        //event function binders
        this.handleFiltering = this.handleFiltering.bind(this);
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);

    }
    
    handleSearchBarChange = (criteria) => {
        this.setState({searchCriteria: criteria.target.value});
    }

    handleFiltering(filter) {
        console.log(filter+ " was clicked");
        let results = this.state.requests;

        
        return results;
    }

    render() { 
        console.log(this.props);
        return ( 
            <div className="page-content-container">
                <div className="requests-header">
                    <h1>Requests</h1>
                    <form action='/requests/' className="searchbar" noValidate autoComplete="off">
                        <TextField name="search" id="standard-basic" label="Search🔎" />
                    </form>
                    <ButtonGroup>
                        {this.state.filters.map(filter => 
                            <Button color="primary" onClick={this.handleFiltering({filter})} key={filter}>{filter}</Button>
                        )} 
                        {/* TODO - set the onclick for filter */}
                    </ButtonGroup>
                </div>

                <RequestListGroup value="hello"/>
            </div> 
        );
    }
}
 
export default Requests;
