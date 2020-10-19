import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import UserContext from "../Context/userContext";



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { userDetails, setUserDetails } = useContext(UserContext); 

  const logout = () => {
    setUserDetails({
      token: undefined,
      user: undefined
    });
    localStorage.setItem("token", "")
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            IOU
          </Typography>
          { userDetails.user ? (
            <>
              <Link to="/requests"><Button color="inherit">Requests</Button></Link>
              <Link to="/favours"><Button color="inherit">Favours</Button></Link>
              <Link to="/leaderboard"><Button color="inherit">Leaderboard</Button></Link>
              <Link to="/"><Button onClick={logout} color="inherit">Log out</Button></Link>
            </>
          ) : (
            <>
              <Link to="/login"><Button color="inherit">Login</Button></Link>
              <Link to="/register"><Button color="inherit">Register</Button></Link>
              <Link to="/requests"><Button color="inherit">Requests</Button></Link>
              <Link to="/leaderboard"><Button color="inherit">Leaderboard</Button></Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}