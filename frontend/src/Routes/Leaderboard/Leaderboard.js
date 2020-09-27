import React, { useState, useEffect } from 'react';
import Table from './Components/table'
import TextField from '@material-ui/core/TextField';
import './leaderboard.css'

const Leaderboard = props => {
    const [input, setInput] = useState('');
    const [userListDefault, setUserListDefault] = useState();
    const [userList, setUserList] = useState();
  
    const getData = async () => {
      return await fetch(`/api/leaderboard`)
        .then(response => response.json())
        .then(users => {
           setUserList(users) 
           setUserListDefault(users)
         });}
  
    const updateInput = async (input) => {
       const filtered = userListDefault.filter(users => {
        return users.firstName.toLowerCase().includes(input.toLowerCase())
       })
       setInput(input);
       setUserList(filtered);
    }
  
    useEffect( () => {getData()},[]);
      
    return (
      <>
      <div class="leaderboard">
       
          <h1 class="centre-this">Leaderboard</h1>
        
          
  
          <TextField class="centre-this"
          id="standard-full-width" 
          fullWidth
          placeholder="Search for a user..."
          variant="outlined"
          value={input} 
          onChange={(e) => updateInput(e.target.value)}>
         
          </TextField>
        
         
            <table class="ui very padded table">
                        
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Requests Completed</th>
                            </tr>
                        </thead>
                        <tbody>         
              <Table userList={userList}/>
              </tbody>
                    </table>
                    </div>
                    
      </>
     );
  }
  
  export default Leaderboard 