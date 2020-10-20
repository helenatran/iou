import React, { useState, useEffect } from 'react';
import './leaderstyle.css'
import Axios from 'axios';
import PaginationLeaderboard from './Components/Pagination';
import Users from './Components/Users';

const Leaderboard = props => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  


  useEffect(() => {
   const getUsers = async () => {
    const res = await Axios.get(`/api/leaderboard`);
    setUsers(res.data);
    
        };
        getUsers();
       }, []);

       const indexOfLastUser = currentPage * usersPerPage;
       const indexOfFirstUser = indexOfLastUser - usersPerPage;
       const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
     
 
   return (
   
     <div className="leaderboard">
       <br/>
    <h1>Leaderboard</h1>
    <p>Showing users with the most requests completed!</p>
     
    <PaginationLeaderboard usersPerPage = {usersPerPage} 
       totalUsers = {users.length} 
       paginate={paginate}
       currentPage = {currentPage}/>
      
       
       <Users users = {currentUsers} currentPage = {currentPage}/>
    
    
     </div>
     
   )
  }
  
  export default Leaderboard 