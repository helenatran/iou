import React from 'react';
import Button from '@material-ui/core/Button';
import '../leaderstyle.css'

const PaginationLeaderboard = ({usersPerPage, totalUsers, paginate, currentPage}) => {
    const numberOfPages = Math.ceil(totalUsers / usersPerPage);
    /* first page: only the next button will be active.
    ** second page: only the back button will be active.
    */
    if (currentPage > 1) {

        if (currentPage < numberOfPages) {
            return (<div className="paginationButton">
                <Button variant="contained" color="primary" onClick={() => paginate(currentPage - 1)} href="/leaderboard/!#"> Back </Button>
                <span className="spaceButton">{currentPage} of {numberOfPages}</span>
                <Button variant="contained" color="primary" onClick={() => paginate(currentPage + 1)} href="/leaderboard/!#"> Next </Button>
            </div>)
        } else {
            return (<div className="paginationButton"><Button variant="contained" color="primary" onClick={() => paginate(currentPage - 1)} href="/leaderboard/!#"> Back </Button>
                <span className="spaceButton">{currentPage} of {numberOfPages}</span>
                <Button variant="contained" disabled> Next </Button>
            </div>)
        }
    } else {


    return (
            <div className="paginationButton">
                <Button variant="contained" disabled> Back </Button>
                <span className="spaceButton">{currentPage} of {numberOfPages}</span>
                <Button variant="contained" color="primary" onClick={() => paginate(currentPage + 1)} href="/leaderboard/!#">Next</Button>
            </div>
        )
    }

}

export default PaginationLeaderboard;
