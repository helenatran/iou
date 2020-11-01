import React from 'react';
import { TextField } from '@material-ui/core';

const FavourUpdateComments = (props) => {
    return (
        <TextField
            id="outlined-multiline-static"
            label="Comments"
            multiline
            rows={3}
            variant="outlined"
            margin="normal"
            fullWidth
            value={props.comments}
            onChange={props.updateComments}
            style={{ marginBottom: 15 }}
        />
    );
}

export default FavourUpdateComments;