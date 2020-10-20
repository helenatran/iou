import React, { useState, useEffect } from "react";
import "./RequestStyles.css";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Switch from '@material-ui/core/Switch';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const RequestListGroup = ({newRequests, currentPage, maxPage}) => {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
      };
      
    return(
   <div>
     <FormControlLabel onClick={handleClick} control={<Switch />} label="Show rewards" />
        <div className="list-group-container">
            {newRequests.map(({_id, taskTitle, rewards}, i) => (
                <div key={i}>
                    <Card className="request-card">
                    <h5>Task:</h5>  {taskTitle} <br/> 
                    <h5>Rewards:</h5> There are {rewards.length} rewards.
                <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                {rewards.map((rewards, j) =>
                <div key={j}>
                    <ListItem button>
                        <ListItemText primary={rewards.rewardItem} />
                    </ListItem>
                </div>)}
                </List>
                </Collapse>
                <br/>
                <br/>
                <Link to={"/request/" + _id}>
                    <Button fullWidth variant="contained" color="primary" > View Request </Button>
                </Link>
            </Card>
            </div>
       )
       
       )}

   </div>
   </div>
    )
  
}
export default RequestListGroup;

