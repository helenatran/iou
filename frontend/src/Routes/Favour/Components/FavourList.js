import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import FavourListMessage from './FavourListComponents/FavourListMessage';
import FavourListCard from './FavourListComponents/FavourListCard';

const useStyles = makeStyles((theme) => ({
    gridRoot: {
        flexGrow: 1,
        margin: 2,
    }
}));

export default function FavourList(props) {
    const classes = useStyles();

    return (
        <div>
            <Grid container className={classes.gridRoot} spacing={3}>
                <FavourListMessage favours={props.favours} favoursToShow={props.favoursToShow} />
                {props.favours.map((item) => (
                    <Grid item key={item._id}>
                        <FavourListCard updateSelectedFavour={props.updateSelectedFavour} item={item} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}