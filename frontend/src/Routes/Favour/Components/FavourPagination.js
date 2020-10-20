import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
    },
}));

const FavourPagination = ({ favoursPerPage, totalFavours, paginate }) => {
    const classes = useStyles();
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalFavours / favoursPerPage); i++) {
        pageNumbers.push(i)
    }
    const [page, setPage] = React.useState(1);
    const handlePageChange = (event, value) => {
        paginate(value);
        setPage(value);
    };

    return (
        <div className={classes.root}>
            <Pagination count={pageNumbers.length} page={page} color="primary" onChange={handlePageChange} />
        </div>
    );
}

export default FavourPagination;