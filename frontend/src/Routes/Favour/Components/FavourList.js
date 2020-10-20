import React from 'react';
import Time from 'react-time-format';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    gridRoot: {
        flexGrow: 1,
        margin: 2,
    },
    //Card
    cardRoot: {
        width: 275,
    },
}));

export default function FavourList(props) {
    const classes = useStyles();

    return (
        <div>
            <Grid container className={classes.gridRoot} spacing={3}>
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
                                    <Typography variant="h6">{item.favourName}</Typography>
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