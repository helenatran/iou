import React from 'react'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import FavourList from './Components/FavourList';
import FavourPagination from './Components/FavourPagination';
import { Link } from 'react-router-dom';
import getToken from '../../Helpers/getToken';
import Container from '@material-ui/core/Container';


const useStyles = (theme) => ({
    root: {
       // margin: 20
    },
    buttonMargin: {
        marginRight: '20px',
    },
    favourTitle: {
        marginTop: '20px'
    }
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
            currentPage: 1,
            favoursPerPage: 6,
            loading: true,
        };
        this.updateSelectedFavour = this.updateSelectedFavour.bind(this);
        this.paginate = this.paginate.bind(this);
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
                    loading: false,
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

    paginate(pageNumber) {
        this.setState({
            currentPage: pageNumber
        })
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
        const indexOfLastFavour = this.state.currentPage * this.state.favoursPerPage;
        const indexOfFirstFavour = indexOfLastFavour - this.state.favoursPerPage;
        const currentFavours = favours.slice(indexOfFirstFavour, indexOfLastFavour);

        return (
            <Container maxWidth="md">
            <div className={classes.root}>
                <h1 style={{marginTop: 20}}>Favours</h1>
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
                    <Button className={classes.buttonMargin} variant="contained" onClick={() => this.updateShow('pendingIOwe')}>Favours I Owe</Button>
                    <Button className={classes.buttonMargin} variant="contained" onClick={() => this.updateShow('pendingOweMe')}>Favours I'm Owed</Button>
                    <Button className={classes.buttonMargin} variant="contained" onClick={() => this.updateShow('completed')}>Past favours</Button>
                </div>
                {this.state.loading ? ("") : (
                    <FavourList favours={currentFavours} updateSelectedFavour={this.updateSelectedFavour} favoursToShow={this.state.favoursToShow} />
                )}
                <Link to={`/favours/create`}><Button variant="contained">Create Favour</Button></Link>
                <FavourPagination favoursPerPage={this.state.favoursPerPage} totalFavours={favours.length} paginate={this.paginate} />
            </div >
            </Container>
        )
    }
}

export default withStyles(useStyles)(Favours)