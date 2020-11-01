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

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorState(false);
        try {
            const requestsCompleted = 0;
            const newRegisteredUser = { firstName, lastName, email, password, requestsCompleted }
            await axios.post('/api/user/register', newRegisteredUser)
            history.push('/login')
        } catch (err) {
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