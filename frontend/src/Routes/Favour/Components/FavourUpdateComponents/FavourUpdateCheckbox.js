import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

const FavourUpdateCheckbox = (props) => {
    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Checkbox
                        color="primary"
                        checked={props.isCompleted}
                        onChange={props.handleCheck}
                    />
                }
                label="I confirm the favour has been completed:"
                labelPlacement="start"
                style={{ marginLeft: 0 }}

            />
        </FormGroup>
    );
}

export default FavourUpdateCheckbox;