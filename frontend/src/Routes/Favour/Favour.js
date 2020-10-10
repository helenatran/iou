import React from 'react'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import FavourList from './Components/FavourList';
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
            searchInput: '',
            favours: [],
            filteredFavours: [],
            favoursToShow: 'pending',
            selectedFavour: {}
        };
        this.updateSelectedFavour = this.updateSelectedFavour.bind(this);
    }

    componentDidMount() {
        const url = 'http://localhost:5000/api/favours';
        (async () => {
            try {
                const res = await axios.get(url);
                const { data } = await res;
                this.setState({
                    favours: data,
                    filteredFavours: data
                })
            } catch (e) {
                console.log(e);
            }
        })();
    }

    updateShow = (showState) => {
        this.setState({
            favoursToShow: showState
        })
    }

    updateSelectedFavour = (favour) => {
        this.setState({
            selectedFavour: favour
        })
    }

    updateSearchInput = (input) => {
        const filtered = this.state.favours.filter(favour => {
            return favour.favourName.toLowerCase().includes(input.toLowerCase())
        })
        this.setState({
            searchInput: input,
            filteredFavours: filtered
        })
    }

    render() {
        const { classes } = this.props;
        let favours = [];
        if (this.state.favoursToShow === 'pending') {
            favours = this.state.filteredFavours.filter(favour => !favour.isCompleted);
        }
        else if (this.state.favoursToShow === 'completed') {
            favours = this.state.filteredFavours.filter(favour => favour.isCompleted);
        }

        return (
            <div className={classes.root}>
                <h1>Favours</h1>
                <TextField className="centre-this"
                    id="standard-full-width"
                    fullWidth
                    placeholder="Search for a favour..."
                    variant="outlined"
                    value={this.searchInput}
                    onChange={(e) => this.updateSearchInput(e.target.value)}
                    style={{ marginBottom: 10 }}>
                </TextField>
                <div>
                    <Button variant="contained" onClick={() => this.updateShow('pending')}>I owe</Button>
                    <Button variant="contained" onClick={() => this.updateShow('pending')}>Owe me</Button>
                    <Button variant="contained" onClick={() => this.updateShow('completed')}>Past favours</Button>
                </div>
                <FavourList favours={favours} updateSelectedFavour={this.updateSelectedFavour} />
                <Link to={`/favours/create`}><Button variant="contained">Create Favour</Button></Link>
            </div >
        )
    }
}

export default withStyles(useStyles)(Favours)