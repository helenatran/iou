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
    input: {
        display: 'none',
    },
}))

const FavourFormButtons = (props) => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={props.updateProof} />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">Upload photo proof</Button>
                </label>
                <p style={{ marginTop: 5, marginLeft: 5 }}>{props.proofConfirmation}</p>
            </div>
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