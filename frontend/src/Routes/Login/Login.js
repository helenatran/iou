import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Box, Paper, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../Context/userContext';
import ErrorNotice from '../Errors/Error'

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
    //Initialise states
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ error, setError ] = useState([]);
    const [ errorState, setErrorState ] = useState();
    const { setUserDetails } = useContext(UserContext);
    const history = useHistory();
    
    /*
     * Authentication code from:
       - https://github.com/jgbijlsma/mern-auth-template-front/blob/master/src/components/auth/Login.js
       - https://www.youtube.com/watch?v=bppuE6rbO1c&ab_channel=Devistry
     */
    const submitForm = async (e) => {
        e.preventDefault();
        //On method call, we want to set the error state back to false to prevent the error from persisting
        setErrorState(false);
        try {
            //If the API call to login is successful, populate Context values with the result of the call
            const userLogin = { email, password };
            const login = await axios.post('/api/user/login', userLogin);
            setUserDetails({
                token: login.data.success.token,
                user: login.data.success.user,
            });
            //Set the JWT token generated from backend to localStorage, then redirect to homepage
            localStorage.setItem("token", login.data.success.token);
            history.push("/");
        } catch (err) {
            //If an error occurs, set the value of the error to the error received from backend, then setErrorState true to render error component
            err.response.data.error && setError(err.response.data.error)
            setErrorState(true);
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
                    {/* Render the ErrorNotice component if an error has been returned from the backend  */}
                    { errorState === true ? <ErrorNotice message={error} /> : "" }
                    {/* Display the form for logging in */}
                    <Box display="flex" justifyContent="center" margin="1vw">
                        <TextField 
                            id="outlined-basic" 
                            label="Email"
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