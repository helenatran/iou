import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import './RequestStyles.css';

/**
 * NB: moved to main requests component, too hard to pass data up then down into lists group, 
 * TODO- delete this file after absolutely sure of non-use 
 */

class RequestsHeader extends Component {
    state = { 
        filters: ['All open requests', 'Pending Confirmation Requests', 'Your Requests'],
        searchCriteria: '',
        
    }

    handleSearchBarChange = (criteria) => {
        this.setState({searchCriteria: criteria.target.value});
    }

    // renderSearchResultsInfo() {
    //     let result = `Showing ${this.state.requests.length} results`;
    //     if (this.state.searchCriteria) {
    //         result += `for search criteria "${this.state.searchCriteria}"`;
    //     }
    //     return result;
    // }

    handleFiltering(filter) {

    }

    //https://stackoverflow.com/questions/42217579/data-binding-in-react
    render() {
        //contains requests heading, search field, filtergroup
        return (
            <React.Fragment className="requests-header">
                <h1>Requests</h1>
                <form action='/requests/' className="searchbar" noValidate autoComplete="off">
                    <TextField name="search" id="standard-basic" label="Search🔎" />
                </form>
                {/* <div>{this.renderSearchResultsInfo()}</div> */}
                <ButtonGroup>
                    {this.state.filters.map(filter => 
                        <Button color="primary" onClick={this.handleFiltering({filter})} key={filter}>{filter}</Button>
                    )}
                </ButtonGroup>
            </React.Fragment>
        );
    }
}
export default RequestsHeader;

