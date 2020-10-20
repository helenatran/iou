import React from 'react';
import Button from '@material-ui/core/Button';
import '../leaderstyle.css'



const PaginationLeaderboard = ({usersPerPage, totalUsers, paginate, currentPage}) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i)
    }
    const numberOfPages = Math.ceil(totalUsers / usersPerPage);

//look up conditional rendering

if (currentPage > 1) {

    if (currentPage < numberOfPages) {
    return(<div className ="paginationButton">
        <Button variant="contained" color="primary" onClick={() => paginate(currentPage-1)} href="/leaderboard/!#"> Back </Button>
   <span className="spaceButton">{currentPage} of {numberOfPages}</span>
   <Button variant="contained" color="primary" onClick={() => paginate(currentPage+1)} href="/leaderboard/!#"> Next </Button>
    </div>)
    }
    else {
        return(<div className ="paginationButton"><Button variant="contained" color="primary" onClick={() => paginate(currentPage-1)} href="/leaderboard/!#"> Back </Button>
<span className="spaceButton">{currentPage} of {numberOfPages}</span>
<Button variant="contained" disabled> Next </Button>
        </div>)
    }
}
else {

    
    return( <div className ="paginationButton">
       <Button variant="contained" disabled> Back </Button>
        <span className="spaceButton">{currentPage} of {numberOfPages}</span>
          <Button variant="contained" color="primary" onClick={() => paginate(currentPage+1)} href="/leaderboard/!#">Next</Button>
    </div>)
  

}

}

export default PaginationLeaderboard;
