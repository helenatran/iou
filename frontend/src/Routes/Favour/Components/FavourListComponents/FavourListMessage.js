import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    noFavour: {
        margin: theme.spacing(50),
    },
    noCompletedFavour: {
        margin: theme.spacing(50),
    }
}));


const FavourListMessage = (props) => {
    const classes = useStyles();
    return (
        <div>
            {props.favours.length === 0 && props.favoursToShow !== 'completed' ? (
                <Typography variant="h5" className={classes.noFavour}>No favour has been recorded. Click below to create a new favour!</Typography>
            ) : ("")}
            {props.favours.length === 0 && props.favoursToShow === 'completed' ? (
                <Typography variant="h5" className={classes.noCompletedFavour}>You have no past favours</Typography>
            ) : ("")}
        </div>
    );
}

export default FavourListMessage;