import React from 'react';
import { makeStyles, Button } from '@material-ui/core';

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

const FavourFormProofUpload = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>{props.oweMe ? (
                <div>
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
                </div>
            ) : ('')}</div>

            <p style={{ marginTop: 5, marginLeft: 5 }}>{props.proofConfirmation}</p>
        </div>
    );
}

export default FavourFormProofUpload;