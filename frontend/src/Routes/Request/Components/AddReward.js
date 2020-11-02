import React, { useContext, useState } from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";


import './RequestStyles.css';
import {FavourTypesContext} from '../../../Context/favourTypesContext';


const AddReward = (props) => {
    const [favourTypes, setFavourTypes] = useContext(FavourTypesContext);
    const [newReward, setNewReward] = useState('');

    const handleAddReward = (e) => {
        e.preventDefault();
        props.handleAddReward(newReward);
    }
    
    const updateNewReward = e => {
        setNewReward(e.target.value);
    }

    return (
        <div className="add-reward">
            <Select value={newReward} onChange={updateNewReward}>
                {favourTypes.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
            <Button onClick={handleAddReward} variant="contained" color="primary">
                Add Reward
            </Button>
        </div>
    );
}
 
export default AddReward;