import React from 'react';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';

const FavourFormSwitch = (props) => {
    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Switch
                        checked={props.oweMe}
                        onChange={props.updateOweMe}
                        color="primary"
                    />
                }
                label="Owe me"
            />
        </FormGroup>
    );
}

export default FavourFormSwitch;