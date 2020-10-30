import React from 'react';
import axios from 'axios';
import { withStyles, Paper, Grid } from '@material-ui/core';
import FavourSingleImage from './FavourSingleComponents/FavourSingleImage';
import FavourSingleDetails from './FavourSingleComponents/FavourSingleDetails';
import FavourSingleButtons from './FavourSingleComponents/FavourSingleButtons';

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
    }
})

class FavourSingle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favour: this.props.location.state.favour
        }
        this.deleteFavour = this.deleteFavour.bind(this);
    }

    deleteFavour(event) {
        event.preventDefault();
        axios.delete(`/api/favours/${this.state.favour._id}`, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log(response);
                window.location = '/favours';
            })
            .catch(err => console.log(err))
    }

    render() {
        const favour = this.state.favour;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper>
                    <Grid container spacing={2}>
                        <Grid item className={classes.gridItem}>
                            <FavourSingleImage favour={favour} />
                        </Grid>
                        <Grid item className={classes.gridItem}>
                            <FavourSingleDetails favour={favour} />
                        </Grid>
                    </Grid>
                    <FavourSingleButtons favour={favour} deleteFavour={this.deleteFavour} />
                </Paper>
            </div >
        );
    }
}

export default withStyles(useStyles)(FavourSingle);