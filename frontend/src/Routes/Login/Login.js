import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Box, Paper, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../Context/userContext'


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 200,
      '& > *': {
        padding: theme.spacing(5,30,5,30),
      },
    },
  }));



export default function Login() {
    const classes = useStyles();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { setUserDetails } = useContext(UserContext);
    const history = useHistory();
    
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const userLogin = { email, password };
            const login = await axios.post('/api/user/login', userLogin);
            setUserDetails({
                token: login.data.success.token,
                user: login.data.success.user,
            });
            localStorage.setItem("token", login.data.success.token);
            history.push("/");
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div 
        className={classes.root} 
        justifyContent="center" 
        alignItems="center">
                <Paper>
                    <form onSubmit={submitForm}>
                    <Box display="flex" justifyContent="center" >
                        <h1>Login</h1>
                    </Box>
                    <Box display="flex" justifyContent="center" margin="1vw">
                        <TextField 
                            id="outlined-basic" 
                            label="Username"
                            type="email" 
                            variant="outlined" 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Box>
                    <Box display="flex" justifyContent="center" margin="1vw">
                        <TextField 
                            id="outlined-basic" 
                            label="Password"
                            type="password"
                            variant="outlined"
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                    </Box>
                    <Box display="flex" justifyContent="center" >
                        <Button 
                            variant="contained" 
                            color="primary" 
                            margin="1vw"
                            type="submit">
                            Log in
                        </Button>
                    </Box>
                    <Box display="flex" justifyContent="center" margin = "1vw" >
                        <p>Don't have an account yet? <Link to="/register">Register here.</Link></p>
                    </Box>
                    </form>
                </Paper>
        </div>
     
    )
}