import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

const FavourFormUsersOweMe = (props) => {
    return (
        <div>{props.oweMe ? (
            <TextField
                id="oweMe"
                label="Me"
                fullWidth
                disabled
                margin="normal"
                variant="outlined"
                style={{ width: 300, marginLeft: 10 }} />
        ) : (
                <Autocomplete
                    id="combo-box-right-friend"
                    options={props.users}
                    getOptionLabel={option => option.firstName}
                    onChange={props.updateFriend}
                    style={{ width: 300, marginLeft: 10 }}
                    renderInput={(params) =>
                        <TextField {...params}
                            label="Select a user"
                            variant="outlined"
                            required
                            margin="normal"
                            fullWidth
                        />}
                />
            )}</div>
    );
}

export default FavourFormUsersOweMe;