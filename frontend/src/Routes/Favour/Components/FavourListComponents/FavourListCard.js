import React from 'react';
import Time from 'react-time-format';
import { makeStyles, Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FavourListAvatar from './FavourListAvatar';

const useStyles = makeStyles((theme) => ({
    cardRoot: {
        width: 275,
    },
    avatar: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}));


const FavourListCard = (props) => {
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.cardRoot}>
                <CardActionArea onClick={props.updateSelectedFavour.bind(this, props.item)} component={Link}
                    to={{
                        pathname: '/favours/' + props.item._id,
                        myCustomProps: props.item,
                        state: { favour: props.item }
                    }}>
                    <CardContent>
                        <div className={classes.avatar}>
                            <FavourListAvatar favourName={props.item.favourName} />
                            <Typography variant="h6" style={{ marginLeft: 5, marginTop: 5 }}>{props.item.favourName}</Typography>
                        </div>
                        <Typography>{props.item.isCompleted ? (props.item.oweMe ? ('Type: Owe me') : ('Type: I owe')) : ('')}</Typography>
                        <Typography>Friend: {props.item.oweMe ? (props.item.owner.firstName) : (props.item.ower.firstName)}</Typography>
                        <Typography>{props.item.timeCompleted == null ?
                            (<span>Date Created: <Time value={props.item.timeCreated} format="DD/MM/YYYY" /></span>)
                            :
                            (<span>Date Completed: <Time value={props.item.timeCompleted} format="DD/MM/YYYY" /></span>)}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}

export default FavourListCard;