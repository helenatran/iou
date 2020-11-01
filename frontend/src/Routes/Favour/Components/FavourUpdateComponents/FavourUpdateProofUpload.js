import React from 'react';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'flex',
        justifyContent: 'center',
        margin: 6
    },
    input: {
        display: 'none',
    },
}));

const FavourUpdateProofUpload = (props) => {
    const classes = useStyles();
    return (
        <div>{props.favour.oweMe ? ('') : (
            <div className={classes.button}>
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
        )}</div>
    );
}

export default FavourUpdateProofUpload;