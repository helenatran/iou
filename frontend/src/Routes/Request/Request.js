import React, { useState, useEffect } from 'react';
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import RequestListGroup from './Components/RequestListGroup';
import Pagination from './Components/Pagination';
import './Components/RequestStyles.css';
import Container from '@material-ui/core/Container';

const Requests = props => {
    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [requestsPerPage] = useState(6);
    const [input, setInput] = useState('');
    const [newRequests, setNewRequests] = useState([]);



    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        const getRequests = async () => {
            const res = await axios.get(`/api/request`)
            setRequests(res.data);
            setNewRequests(res.data);
        };
        getRequests();
    }, []);

    const updateInput = (input) => {
        const filtered = requests.filter(requests => {
            return requests.taskTitle.toLowerCase().includes(input.toLowerCase())})
            setInput(input);
            setNewRequests(filtered);
            setCurrentPage(1)
    }

const lastRequest = currentPage * requestsPerPage;
const firstRequest = lastRequest - requestsPerPage;
const currentRequests = newRequests.slice(firstRequest,lastRequest);
const maxPage = Math.ceil(newRequests.length/requestsPerPage);

return (
    <div className="requestsPage">
        <Container maxWidth="md">
        <div className="requests-header">
            <h1>Requests</h1>
        </div>
        <div className="spacing">
    <TextField label="Search for task..." id="standard-full-width" value={input} onChange={(e)=> updateInput(e.target.value)} className="searchbar"/>
    </div>
    <div className="spacing">
    <Pagination  paginate={paginate} currentPage = {currentPage} totalRequests={newRequests.length} requestsPerPage = {requestsPerPage}/>
    </div>
    <RequestListGroup maxPage={maxPage} newRequests = {currentRequests} currentPage = {currentPage}/>
    </Container>
    </div>
)
}

export default Requests;
