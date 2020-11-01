import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

const FavourFormUsersIOwe = (props) => {
    return (
        <div>{props.oweMe ? (
            <Autocomplete
                id="combo-box-left-friend"
                options={props.users}
                getOptionLabel={option => option.firstName}
                onChange={props.updateFriend}
                style={{ width: 300, marginRight: 10 }}
                renderInput={(params) =>
                    <TextField {...params}
                        label="Select a user"
                        variant="outlined"
                        required
                        margin="normal"
                        fullWidth
                    />}
            />
        ) : (
                <TextField
                    id="iOwe"
                    label="I"
                    fullWidth
                    disabled
                    margin="normal"
                    variant="outlined"
                    style={{ width: 300, marginRight: 10 }} />
            )}</div>
    );
}

export default FavourFormUsersIOwe;