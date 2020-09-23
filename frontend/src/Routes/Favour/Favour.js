import React from 'react'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FavourList from './FavourList';
import { Link } from 'react-router-dom';

const useStyles = (theme) => ({
    root: {
        margin: theme.spacing(1),
    },
});

class Favours extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            favours: [],
            favoursToShow: 'pending'
        };
    }

    componentDidMount() {
        const url = 'http://localhost:5000/api/favours';
        axios.get(url)
            .then((res) => {
                this.setState({
                    favours: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    updateShow = (showState) => {
        this.setState({
            favoursToShow: showState
        })
    }

    render() {
        const { classes } = this.props;
        let favours = [];
        if (this.state.favoursToShow === 'pending') {
            favours = this.state.favours.filter(favour => !favour.isCompleted);
        }
        else if (this.state.favoursToShow === 'completed') {
            favours = this.state.favours.filter(favour => favour.isCompleted);
        }

        return (
            <div className={classes.root}>
                <h1>Favours</h1>
                <div>
                    <Button variant="contained" onClick={() => this.updateShow('pending')}>I owe</Button>
                    <Button variant="contained" onClick={() => this.updateShow('pending')}>Owe me</Button>
                    <Button variant="contained" onClick={() => this.updateShow('completed')}>Past favours</Button>
                </div>
                <FavourList favours={favours} />
                <Link to={`/favours/create-favour`}><Button variant="contained">Create Favour</Button></Link>
            </div>
        )
    }
}

export default withStyles(useStyles)(Favours)