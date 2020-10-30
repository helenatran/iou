import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'flex',
        justifyContent: 'center',
        margin: 6
    },
}));

const FavourSingleButtons = (props) => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.button}>
                {props.favour.isCompleted ? (
                    <Button variant="contained" onClick={props.deleteFavour}>Delete Favour</Button>
                ) : (<Link to={{
                    pathname: '/favours/' + props.favour._id + '/update',
                    myCustomProps: props.favour,
                    state: { favour: props.favour },
                }}><Button variant="contained">Update Favour</Button></Link>)}
            </div>
            <div className={classes.button}>
                <Link to={`/favours`}><Button variant="contained">Back to list</Button></Link>
            </div>
        </div>
    );
}

export default FavourSingleButtons;