import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 8
    },
}))

const FavourFormButtons = (props) => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root} style={{ marginTop: 8 }}>
                <Button variant="contained" type="submit" onClick={props.submitFavour}>Submit</Button>
            </div>
            <div className={classes.root} style={{ marginTop: 8 }}>
                <Link to={`/favours`}><Button variant="contained">Back</Button></Link>
            </div>
        </div>
    );
}

export default FavourFormButtons;