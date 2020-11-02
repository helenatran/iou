import React from 'react';
import Button from '@material-ui/core/Button';
import './RequestStyles.css'

const Pagination = ({currentPage, paginate, totalRequests, requestsPerPage, numberOfPages}) => {

    /* first page: only the next button will be active.
    ** second page: only the back button will be active.
    */
    if (currentPage > 1) {
        if (currentPage < numberOfPages) {
            return(
                <div> 
                    <Button  variant="contained" color="primary" onClick={() => paginate(currentPage-1)} href="/requests/!#">Back</Button>
                    <span className="buttonNext">Page {currentPage} of {numberOfPages}  </span>
                    <Button  variant="contained" color="primary" onClick={() => paginate(currentPage+1)} href="/requests/!#">Next</Button> 
                </div>
            )
        } else {
            return(
                <div>
                    <Button variant="contained" color="primary" onClick={() => paginate(currentPage-1)} href="/requests/!#">Back</Button>
                    <span className="buttonNext">Page {currentPage} of {numberOfPages}</span> 
                    <Button  variant="contained" color="primary" disabled>Next</Button> 
                </div>
            )
        }
    }
    else {
        if(totalRequests >= 1) {
            if(numberOfPages > 1){
                return(
                    <div>
                        <Button variant="contained" color="primary" disabled>Back</Button>
                        <span className="buttonNext">Page {currentPage} of {numberOfPages}  </span>
                        <Button   variant="contained" color="primary"  onClick={() => paginate(currentPage+1)} href="/requests/!#">Next</Button> 
                    </div>
                )
            } else {
                return( 
                    <div>
                        <Button variant="contained" color="primary" disabled>Back</Button>
                        <span className="buttonNext">Page {currentPage} of {numberOfPages}  </span>
                        <Button variant="contained" color="primary" disabled>Next</Button>
                    </div>    
                )
            }
    }
    else {
        return("No requests found. Please try searching for another keyword.")
    }
}
};

export default Pagination;