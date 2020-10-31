import React from 'react';
import { TextField } from '@material-ui/core';

const FavourSearchBar = (props) => {
    return (
        <TextField className="centre-this"
            id="standard-full-width"
            fullWidth
            placeholder="Search for a favour..."
            variant="outlined"
            value={props.searchInput}
            onChange={(e) => props.updateSearchInput(e.target.value)}
            style={{ marginBottom: 10 }}>
        </TextField>
    );
}

export default FavourSearchBar;