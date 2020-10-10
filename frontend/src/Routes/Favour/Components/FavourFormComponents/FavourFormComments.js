import React from 'react';
import { TextField } from '@material-ui/core';

const FavourFormComments = (props) => {
    return (
        <TextField
            id="outlined-multiline-static"
            label="Comments"
            multiline
            rows={3}
            value={props.comments}
            onChange={props.updateComments}
            variant="outlined"
            fullWidth
            margin="normal" />
    );
}

export default FavourFormComments;