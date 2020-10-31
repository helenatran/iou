import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles, Paper, Grid } from '@material-ui/core';
import FavourSingleImage from './FavourSingleComponents/FavourSingleImage';
import FavourSingleDetails from './FavourSingleComponents/FavourSingleDetails';
import FavourSingleButtons from './FavourSingleComponents/FavourSingleButtons';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 50,
        '& > *': {
            padding: theme.spacing(5, 20, 5, 20),
        },
    },
    gridItem: {
        margin: 8
    }
}))

const FavourSingle = (props) => {
    const classes = useStyles();
    const [favour, setFavour] = useState(props.location.state.favour);

    const deleteFavour = (event) => {
        event.preventDefault();
        axios.delete(`/api/favours/${favour._id}`, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log(response);
                window.location = '/favours';
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={classes.root}>
            <Paper>
                <Grid container spacing={2}>
                    <Grid item className={classes.gridItem}>
                        <FavourSingleImage favour={favour} />
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <FavourSingleDetails favour={favour} />
                    </Grid>
                </Grid>
                <FavourSingleButtons favour={favour} deleteFavour={deleteFavour} />
            </Paper>
        </div >
    );
}

export default FavourSingle;