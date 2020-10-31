import React from 'react';
import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';

const favours = [
    { name: 'Breakfast' },
    { name: 'Dinner' },
    { name: 'Brunch' },
    { name: 'Bubble Tea' },
    { name: 'Drinks' },
    { name: 'Coffee' },
    { name: 'Chocolate' },
    { name: 'Dessert' },
    { name: 'Fast Food' },
    { name: 'Donuts' }
];

const FavourFormFavours = (props) => {
    return (
        <div>
            <Autocomplete
                id="combo-box-favours"
                options={favours}
                getOptionLabel={option => option.name}
                onChange={props.updateFavour}
                renderInput={(params) =>
                    <TextField {...params}
                        label="Select a favour"
                        variant="outlined"
                        required
                        margin="normal"
                        fullWidth
                    />}
            />
        </div>

    );
}

export default FavourFormFavours;