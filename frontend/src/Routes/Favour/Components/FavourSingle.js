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

        let type = '';
        if (favour.oweMe) {
            type = 'Owe me';
        }
        else { type = 'I owe'; }

        let sourceImage = '';
        if (favour.favourName === 'Breakfast') { sourceImage = '/favourImages/breakfast.jpg' }
        if (favour.favourName === 'Brunch') { sourceImage = '/favourImages/brunch.jpg' }
        if (favour.favourName === 'Bubble Tea') { sourceImage = '/favourImages/bubbletea.jpg' }
        if (favour.favourName === 'Coffee') { sourceImage = '/favourImages/coffee.png' }
        if (favour.favourName === 'Dessert') { sourceImage = '/favourImages/dessert.png' }
        if (favour.favourName === 'Dinner') { sourceImage = '/favourImages/dinner.png' }
        if (favour.favourName === 'Donuts') { sourceImage = '/favourImages/donuts.jpg' }
        if (favour.favourName === 'Drinks') { sourceImage = '/favourImages/drinks.png' }
        if (favour.favourName === 'Fast Food') { sourceImage = '/favourImages/fastfood.png' }
        if (favour.favourName === 'Chocolate') { sourceImage = '/favourImages/chocolate.png' }

        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper>
                    <Grid container spacing={2}>
                        <Grid item className={classes.gridItem}>
                            <img src={sourceImage} alt="favour proof" width="225" height="225" />
                        </Grid>
                        <Grid item className={classes.gridItem}>
                            <h1>Favour: {favour.favourName}</h1>
                            <p>{favour.timeCompleted == null ? (<span><b>Date Created: </b><Time value={favour.timeCreated} format="DD/MM/YYYY" /></span>) : (<span><b>Date Completed: </b><Time value={favour.timeCompleted} format="DD/MM/YYYY" /></span>)}</p>
                            <p><b>Friend: </b>{favour.oweMe ? (favour.owner.firstName) : (favour.ower.firstName)}</p>
                            <p><b>Type: </b>{type}</p>
                            <p><b>Status: </b>{favour.status}</p>
                            <p>{favour.favourComment !== "" ? (<span><b>Comments: </b>{favour.favourComment}</span>) : ('')}</p>
                            <p>{favour.proof !== "" ? (<span><b>Photo proof: </b><a href={favour.proof}>Proof</a></span>) : ('')}</p>
                        </Grid>
                    </Grid>
                    <div className={classes.button}>
                        {favour.isCompleted ? ('') : (<Link to={{
                            pathname: '/favours/' + favour._id + '/update',
                            myCustomProps: favour,
                            state: { favour: favour },
                        }}><Button variant="contained">Update Favour</Button></Link>)}
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