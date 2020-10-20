import React from 'react';
import Time from 'react-time-format';
import { makeStyles, Card, CardActionArea, CardContent, Typography, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FavourListAvatar from './FavourListComponents/FavourListAvatar';

const useStyles = makeStyles((theme) => ({
    gridRoot: {
        flexGrow: 1,
        margin: 2,
    },
    //Card
    cardRoot: {
        width: 275,
    },
    avatar: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    noFavour: {
        margin: theme.spacing(50),
    },
    noCompletedFavour: {
        margin: theme.spacing(75),
    }
}));

export default function FavourList(props) {
    const classes = useStyles();

    return (
        <div>
            <Grid container className={classes.gridRoot} spacing={3}>
                {props.favours.length === 0 && props.favoursToShow !== 'completed' ? (
                    <Typography variant="h5" className={classes.noFavour}>No favour has been recorded. Click below to create a new favour!</Typography>
                ) : ("")}
                {props.favours.length === 0 && props.favoursToShow === 'completed' ? (
                    <Typography variant="h5" className={classes.noCompletedFavour}>You have no past favours</Typography>
                ) : ("")}
                {props.favours.map((item) => (
                    <Grid item key={item._id}>
                        <Card className={classes.cardRoot}>
                            <CardActionArea onClick={props.updateSelectedFavour.bind(this, item)} component={Link}
                                to={{
                                    pathname: '/favours/' + item._id,
                                    myCustomProps: item,
                                    state: { favour: item }
                                }}>
                                <CardContent>
                                    <div className={classes.avatar}>
                                        <FavourListAvatar favourName={item.favourName} />
                                        <Typography variant="h6" style={{ marginLeft: 5, marginTop: 5 }}>{item.favourName}</Typography>
                                    </div>
                                    <Typography>{item.isCompleted ? (item.oweMe ? ('Type: Owe me') : ('Type: I owe')) : ('')}</Typography>
                                    <Typography>Friend: {item.oweMe ? (item.owner.firstName) : (item.ower.firstName)}</Typography>
                                    <Typography>{item.timeCompleted == null ? (<span>Date Created: <Time value={item.timeCreated} format="DD/MM/YYYY" /></span>) : (<span>Date Completed: <Time value={item.timeCompleted} format="DD/MM/YYYY" /></span>)}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}