<<<<<<< HEAD
import React from 'react';
import {Button, Box, Paper, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


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
    return (
        <div 
        className={classes.root} 
        justifyContent="center" 
        alignItems="center">
            <Paper >
                <Box display="flex" justifyContent="center" >
                    <h1>Login</h1>
                </Box>
                <Box display="flex" justifyContent="center" margin="1vw">
                    <TextField id="outlined-basic" label="Username" variant="outlined" />
                </Box>
                <Box display="flex" justifyContent="center" margin="1vw">
                    <TextField id="outlined-basic" label="Password" variant="outlined" />
                </Box>
                <Box display="flex" justifyContent="center" >
                    <Button variant="contained" color="primary" margin="1vw">
                        Log in
                    </Button>
                </Box>
                <Box display="flex" justifyContent="center" margin = "1vw" >
                    <p>Don't have an account yet? <Link to="/account">Register here.</Link></p>
                </Box>
            </Paper>
        </div>
     
    )
}

=======
import React from 'react'

const Login = props => {

    return (
        <h1>Login</h1>
    )
}

export default Login;
>>>>>>> d6e6f7b4b1dcb6b835dc6dc460c62452c2bfe752
