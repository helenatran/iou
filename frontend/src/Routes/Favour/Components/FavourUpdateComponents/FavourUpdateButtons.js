import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'flex',
        justifyContent: 'center',
        margin: 6
    }
}));

const FavourUpdateButtons = (props) => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.button}>
                <Button variant="contained" type="submit" onClick={props.updateFavour}>Submit</Button>
            </div>
            <div className={classes.button}>
                <Link to={`/favours`}><Button variant="contained">Cancel</Button></Link>
            </div>
        </div>
    );
}

export default FavourUpdateButtons;