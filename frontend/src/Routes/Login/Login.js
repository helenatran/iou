import React from 'react';
import {Button, Box, Paper, TextField} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = theme => ({
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
  });

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.handleClick = this.handleClick.bind(this)
    }
    
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleClick() {
        const newUser = {
            email: this.state.email,
            password: this.state.password,
        }

        axios.post('/api/user/login', newUser)
            .then(console.log(this.state))
            .catch(err => console.log(err))
    }
    
    render() {
        const { classes } = this.props
        return (
            <div 
            //className={classes.root} 
            justifyContent="center" 
            alignItems="center">
                <Paper >
                    <Box display="flex" justifyContent="center" >
                        <h1>Login</h1>
                    </Box>
                    <Box display="flex" justifyContent="center" margin="1vw">
                        <TextField
                            value={this.state.email}
                            onChange={this.onChangeEmail.bind(this)}
                            id="outlined-basic" 
                            label="Email" 
                            variant="outlined" />
                    </Box>
                    <Box display="flex" justifyContent="center" margin="1vw">
                        <TextField 
                            value={this.state.password}
                            onChange={this.onChangePassword.bind(this)}
                            type="password"
                            id="outlined-basic" 
                            label="Password" 
                            variant="outlined" />
                    </Box>
                    <Box display="flex" justifyContent="center" >
                        <Button 
                            onClick={() => this.handleClick()}
                            variant="contained" 
                            color="primary" 
                            margin="1vw">
                            Log in
                        </Button>
                    </Box>
                    <Box display="flex" justifyContent="center" margin = "1vw" >
                        <p>Don't have an account yet? <Link to="/register">Register here.</Link></p>
                    </Box>
                </Paper>
            </div>
        )
    }
}

export default Login;