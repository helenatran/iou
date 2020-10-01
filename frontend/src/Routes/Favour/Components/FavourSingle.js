import React from 'react';
import Time from 'react-time-format';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 50,
        '& > *': {
            padding: theme.spacing(5, 20, 5, 20),
        },
    },
    gridItem: {
        margin: 8
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        margin: 6
    }
})

class FavourSingle extends React.Component {
    render() {
        const favour = this.props.location.state.favour;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper>
                    <Grid container spacing={2}>
                        <Grid item className={classes.gridItem}>
                            <img src={favour.proof} />
                        </Grid>
                        <Grid item className={classes.gridItem}>
                            <h1>Favour: {favour.favourName}</h1>
                            <p><b>Date Created:</b> <Time value={favour.timeCreated} format="DD/MM/YYYY" /></p>
                            <p><b>Friend:</b> {favour.oweUserId}</p>
                            <p><b>Type:</b></p>
                            <p><b>Status:</b> {favour.status}</p>
                            <p><b>Comments:</b></p>
                            <p><b>Photo proof:</b><a href={favour.proof}>Proof</a></p>
                        </Grid>
                    </Grid>
                    <div className={classes.button}>
                        <Link to={{
                            pathname: '/favours/' + favour._id + '/update',
                            myCustomProps: favour,
                            state: { favour: favour },
                        }}><Button variant="contained">Update Favour</Button></Link>
                    </div>
                    <div className={classes.button}>
                        <Link to={`/favours`}><Button variant="contained">Back to list</Button></Link>
                    </div>
                </Paper>
            </div >
        );
    }
}

export default withStyles(useStyles)(FavourSingle);