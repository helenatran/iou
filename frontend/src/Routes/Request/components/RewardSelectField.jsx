import React, { Component } from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";

import './RequestStyles.css';

class RewardSelectField extends Component {
    constructor(props) {
        super(props);
        /**
         * props required: 
         * label: text field label eg "select reward"
         * handleChangeReward: event handler
         */
        
        this.state = { 
            types: [
                "Breakfast", "Dinner", "Brunch", "Bubble Tea",
                "Drinks", "Coffee", "Chocolate", "Dessert", 
                "Fast Food", "Donuts"
            ]
         }
    }
    render() { 
        return (
                <Select
                    onChange={this.props.handleChangeRewardSelection} required
                >
                    {this.state.types.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>

          );
    }
}
 
export default RewardSelectField;