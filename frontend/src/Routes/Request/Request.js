import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RequestListGroup from './Components/RequestListGroup';
import Pagination from './Components/Pagination';
import { Link } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import './Components/RequestStyles.css';

const Request = props => {
    /* Multiple state variables for pagination */
    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [requestsPerPage] = useState(6);

    /* state variable for user input */
    const [input, setInput] = useState('');
    /* state variable newRequest for filtered requests */
    const [newRequests, setNewRequests] = useState([]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    /* once rendered, get all requests and update the state variables*/
    useEffect(() => {
        const getRequests = async () => {
            const res = await axios.get(`/api/request`)
            setRequests(res.data);
            setNewRequests(res.data);
        };
        getRequests();
    }, []);

    /* uses the input to filter requests and reset pagination */
    const updateInput = (input) => {
        const filtered = requests.filter(requests => {
            return requests.taskTitle.toLowerCase().includes(input.toLowerCase())}) 
            setInput(input); 
            setNewRequests(filtered);
            setCurrentPage(1)
    }

    /* variables for pagination */
    const lastRequest = currentPage * requestsPerPage; // the last request on the current page
    const firstRequest = lastRequest - requestsPerPage; // the first request on the current page
    const currentRequests = newRequests.slice(firstRequest,lastRequest); //current requests shown
    const maxPage = Math.ceil(newRequests.length/requestsPerPage); //the maximum number of pages

    return (
        <div className="requestsPage">
            <Container maxWidth="lg">
                <div className="requests-header">
                    <h1>Requests</h1>
                    <Link to={"/request/new"}>
                        <Button variant="contained" color="primary">
                            Add Request
                        </Button>
                    </Link>
                </div>
                <div className="spacing">
                    <TextField 
                    label="Search for task..." 
                    id="standard-full-width" 
                    value={input} 
                    onChange={(e)=> updateInput(e.target.value)} 
                    className="searchbar"/>
                </div>
                <div className="spacing">
                    <Pagination
                    paginate={paginate}
                    currentPage = {currentPage}
                    totalRequests={newRequests.length}
                    requestsPerPage = {requestsPerPage}
                    numberOfPages = {maxPage}/>
                </div>
                <RequestListGroup 
                maxPage={maxPage} 
                newRequests = {currentRequests} 
                currentPage = {currentPage}/>
            </Container>
        </div>
    )
}

export default Request;
