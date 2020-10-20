import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const PaginationLeaderboard = ({usersPerPage, totalUsers, paginate, currentPage}) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i)
    }

//look up conditional rendering

    return (
        <div>
                   Showing Top {(currentPage-1)*10}-{currentPage*10} Users
                   Page Number <FormControl style={{minWidth:50}} >
        
        <Select>  
            
            {pageNumbers.map(number => (
                <li key = {number}>
                    <a  style={{padding: "8px"}} onClick={() => paginate(number)} href="/leaderboard/!#">{number}</a>
                </li>
            ))} 

</Select>
         </FormControl>
         
         <a  style={{padding: "8px"}} onClick={() => paginate(currentPage-1)} href="/leaderboard/!#">Back</a>  
         <a  style={{padding: "8px"}} onClick={() => paginate(currentPage+1)} href="/leaderboard/!#">Next</a> 

            
            
        </div>
    )
}

export default PaginationLeaderboard;
