import React from 'react'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import FavourList from './Components/FavourList';
import { Link } from 'react-router-dom';
import getToken from '../../Helpers/getToken';

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
            favoursOwned: [],
            favoursOwed: [],
            favoursCompleted: [],
            filteredFavoursOwned: [],
            filteredFavoursOwed: [],
            filteredFavoursCompleted: [],
            favoursToShow: 'pendingIOwe',
            selectedFavour: {},
        };
        this.updateSelectedFavour = this.updateSelectedFavour.bind(this);
    }

    componentDidMount() {
        const url = `/api/favours/user/${getToken().id}`;
        (async () => {
            try {
                const res = await axios.get(url, {
                    headers: {
                        "token": localStorage.getItem("token")
                    }
                });
                const { data } = await res;
                this.setState({
                    favoursOwned: data.owned,
                    favoursOwed: data.owed,
                    favoursCompleted: data.completed,
                    filteredFavoursOwned: data.owned,
                    filteredFavoursOwed: data.owed,
                    filteredFavoursCompleted: data.completed,
                })
            } catch (e) {
                console.log(e);
            }
        })();
    }

    updateShow = (showState) => {
        this.setState({
            favoursToShow: showState,
        })
    }

    updateSelectedFavour = (favour) => {
        this.setState({
            selectedFavour: favour
        })
    }

    updateSearchInput = (input) => {
        if (this.state.favoursToShow === 'pendingIOwe') {
            const filtered = this.state.favoursOwned.filter(favour => {
                return favour.favourName.toLowerCase().includes(input.toLowerCase())
            })
            this.setState({
                searchInput: input,
                filteredFavoursOwned: filtered
            })
        }
        else if (this.state.favoursToShow === 'pendingOweMe') {
            const filtered = this.state.favoursOwed.filter(favour => {
                return favour.favourName.toLowerCase().includes(input.toLowerCase())
            })
            this.setState({
                searchInput: input,
                filteredFavoursOwed: filtered
            })
        }
        else if (this.state.favoursToShow === 'completed') {
            const filtered = this.state.favoursCompleted.filter(favour => {
                return favour.favourName.toLowerCase().includes(input.toLowerCase())
            })
            this.setState({
                searchInput: input,
                filteredFavoursCompleted: filtered
            })
        }

    }

    render() {
        const { classes } = this.props;
        let favours = [];
        if (this.state.favoursToShow === 'pendingIOwe') {
            favours = this.state.filteredFavoursOwned;
        }
        else if (this.state.favoursToShow === 'pendingOweMe') {
            favours = this.state.filteredFavoursOwed;
        }
        else if (this.state.favoursToShow === 'completed') {
            favours = this.state.filteredFavoursCompleted;
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
                    <Button variant="contained" onClick={() => this.updateShow('pendingIOwe')}>I owe</Button>
                    <Button variant="contained" onClick={() => this.updateShow('pendingOweMe')}>Owe me</Button>
                    <Button variant="contained" onClick={() => this.updateShow('completed')}>Past favours</Button>
                </div>
                <FavourList favours={favours} updateSelectedFavour={this.updateSelectedFavour} />
                <Link to={`/favours/create`}><Button variant="contained">Create Favour</Button></Link>
            </div >
        )
    }
}

export default withStyles(useStyles)(Favours)