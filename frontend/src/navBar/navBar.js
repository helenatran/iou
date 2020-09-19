<<<<<<< HEAD
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';



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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">

          </IconButton>
          <Typography variant="h6" className={classes.title}>
            IOU
          </Typography>
          <Link to="/requests"><Button color="inherit">Requests</Button></Link>
          <Link to="/favours"><Button color="inherit">Favours</Button></Link>
          <Link to="/leaderboard"><Button color="inherit">Leaderboard</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
=======
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';



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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            IOU
          </Typography>
          <Link to="/requests"><Button color="inherit">Requests</Button></Link>
          <Link to="/favours"><Button color="inherit">Favours</Button></Link>
          <Link to="/leaderboard"><Button color="inherit">Leaderboard</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
>>>>>>> 1d0c24bcfbd1ad1f6abc3032d61683e98644a2ff
}