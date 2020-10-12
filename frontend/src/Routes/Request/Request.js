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

        //event function binders - if event funcs are arrow functions in a var then binding not needed
        // this.handleFiltering = this.handleFiltering.bind(this);
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);

    }
    
    handleSearchBarChange(event) {
        this.setState({searchCriteria: event.target.value});
    }

    render() { 
        console.log(this.props);
        return ( 
            <div className="page-content-container">                
                <div className="requests-header">
                    <h1>Requests</h1>
                    <form action='/requests/' className="searchbar" noValidate autoComplete="off">
                        <TextField name="search" id="standard-basic" label="Search🔎" onChange={this.handleSearchBarChange} />
                    </form>
                    {/* <ButtonGroup>
                    <Button color="primary" className="active" onClick={() => {this.handleFiltering("All Requests")}}>
                        All Open Requests
                    </Button> */}
                    {/* <Button color="primary" onClick={() => {this.handleFiltering("All Requests")}}>
                        Your Requests
                    </Button>
                    <Button color="primary">Requests Pending Confirmation</Button> */}

                        {/* TODO - set the onclick for filter */}
                    {/* </ButtonGroup> */}
                </div>

                <RequestListGroup requestsList={this.state.requestsList}/>
            </div> 
        );
    }
}
 
export default Requests;
