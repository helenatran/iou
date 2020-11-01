import React, { useState } from 'react'
import {Button, Box, Paper, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../Errors/Error'
import axios from 'axios';

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

const Register = props => {
    const classes = useStyles();
    const [ firstName, setFirstName ] = useState();
    const [ lastName, setLastName ] = useState();
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ error, setError ] = useState([]);
    const [ errorState, setErrorState ] = useState();
    const history = useHistory();

    /*
     * Made partial use of the Authentication code from:
       - https://github.com/jgbijlsma/mern-auth-template-front/blob/master/src/components/auth/Register.js
       - https://www.youtube.com/watch?v=bppuE6rbO1c&ab_channel=Devistry
     * Code differs as authentication code from above immediately logs user in upon successful registration
     * The following code only redirects the successully registered user to the login page
     */
    const submitForm = async (e) => {
        e.preventDefault();
        // On method call, we want to set the error state back to false to prevent the error from persisting
        setErrorState(false);
        try {
            // Create a new user object to be sent to the API call
            const requestsCompleted = 0;
            const newRegisteredUser = { firstName, lastName, email, password, requestsCompleted }
            await axios.post('/api/user/register', newRegisteredUser)
            // If API call is successul, then redirect user to the login page
            history.push('/login')
        } catch (err) {
            // If an error occurs, set the error to error received from backend and then setError state to true to render error
            err.response.data.error && setError(err.response.data.error)
            setErrorState(true);
        }
    }

    return (
        <div 
        className={classes.root} 
        justifyContent="center" 
        alignItems="center">
            {/* Render the ErrorNotice component if an error has been returned from the backend  */}
            { errorState === true ? <ErrorNotice message={error} /> : "" }
            {/* Display the form for logging in */}
            <Paper>
                <h1>Register</h1>
                <form onSubmit={submitForm}>
                    <Box display="flex" justifyContent="center" margin="1vw">
                        <TextField 
                            id="outlined-basic" 
                            variant="outlined" 
                            required 
                            label='First name' 
                            placeholder='First Name'
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center" margin="1vw">
                        <TextField 
                            id="outlined-basic" 
                            variant="outlined"
                            required 
                            label='Last name' 
                            placeholder='Last Name' 
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center" margin="1vw">
                        <TextField 
                            id="outlined-basic" 
                            variant="outlined"
                            type="email" 
                            required 
                            label='Email' 
                            placeholder='Email' 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center" margin="1vw">
                        <TextField 
                            id="outlined-basic" 
                            variant="outlined"
                            type="password" 
                            required 
                            label='Password' 
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center" >
                        <Button 
                            variant="contained" 
                            color="primary" 
                            margin="1vw"
                            type="submit">
                            Register
                        </Button>
                    </Box>
                </form>
            </Paper>
        </div> 
    )
}

export default Register;