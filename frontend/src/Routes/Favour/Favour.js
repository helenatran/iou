import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles, Button, Container } from '@material-ui/core';
import FavourList from './Components/FavourList';
import FavourPagination from './Components/FavourPagination';
import FavourSearchBar from './Components/FavourSearchBar';
import { Link } from 'react-router-dom';
import getToken from '../../Helpers/getToken';

const useStyles = makeStyles((theme) => ({
    buttonMargin: {
        marginRight: '20px',
    },
    favourTitle: {
        marginTop: '20px'
    }
}))

const Favours = () => {
    const classes = useStyles();
    const [searchInput, setSearchInput] = useState('');
    const [favoursOwned, setFavoursOwned] = useState([]);
    const [favoursOwed, setFavoursOwed] = useState([]);
    const [favoursCompleted, setFavoursCompleted] = useState([]);
    const [filteredFavoursOwned, setFilteredFavoursOwned] = useState([]);
    const [filteredFavoursOwed, setFilteredFavoursOwed] = useState([]);
    const [filteredFavoursCompleted, setFilteredFavoursCompleted] = useState([]);
    const [favoursToShow, setFavoursToShow] = useState('pendingIOwe');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = `/api/favours/user/${getToken().id}`;
        const getFavours = async () => {
            try {
                const res = await axios.get(url, {
                    headers: {
                        "token": localStorage.getItem("token")
                    }
                });
                const { data } = await res;
                setFavoursOwned(data.owned);
                setFavoursOwed(data.owed);
                setFavoursCompleted(data.completed);
                setFilteredFavoursOwned(data.owned);
                setFilteredFavoursOwed(data.owed);
                setFilteredFavoursCompleted(data.completed);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }; getFavours();
    }, [])

    const updateSearchInput = (input) => {
        if (favoursToShow === 'pendingIOwe') {
            const filtered = favoursOwned.filter(favour => {
                return favour.favourName.toLowerCase().includes(input.toLowerCase())
            })
            setSearchInput(input);
            setFilteredFavoursOwned(filtered);
        }
        else if (favoursToShow === 'pendingOweMe') {
            const filtered = favoursOwed.filter(favour => {
                return favour.favourName.toLowerCase().includes(input.toLowerCase())
            })
            setSearchInput(input);
            setFilteredFavoursOwed(filtered);
        }
        else if (favoursToShow === 'completed') {
            const filtered = favoursCompleted.filter(favour => {
                return favour.favourName.toLowerCase().includes(input.toLowerCase())
            })
            setSearchInput(input);
            setFilteredFavoursCompleted(filtered);
        }
    }

    let favours = [];
    const FAVOURSPERPAGE = 6;
    if (favoursToShow === 'pendingIOwe') { favours = filteredFavoursOwned; }
    else if (favoursToShow === 'pendingOweMe') { favours = filteredFavoursOwed; }
    else if (favoursToShow === 'completed') { favours = filteredFavoursCompleted; }
    const indexOfLastFavour = currentPage * FAVOURSPERPAGE;
    const indexOfFirstFavour = indexOfLastFavour - FAVOURSPERPAGE;
    const currentFavours = favours.slice(indexOfFirstFavour, indexOfLastFavour);

    return (
        <Container maxWidth="md">
            <div>
                <h1 style={{ marginTop: 20 }}>Favours</h1>
                <FavourSearchBar searchInput={searchInput} updateSearchInput={updateSearchInput} />
                <div>
                    <Button className={classes.buttonMargin} variant="contained"
                        onClick={() => setFavoursToShow('pendingIOwe')}>Favours I Owe</Button>
                    <Button className={classes.buttonMargin} variant="contained"
                        onClick={() => setFavoursToShow('pendingOweMe')}>Favours I'm Owed</Button>
                    <Button className={classes.buttonMargin} variant="contained"
                        onClick={() => setFavoursToShow('completed')}>Past favours</Button>
                </div>
                {loading ? ("") : (
                    <FavourList favours={currentFavours} favoursToShow={favoursToShow} />
                )}
                <Link to={`/favours/create`}><Button variant="contained">Create Favour</Button></Link>
                <FavourPagination favoursPerPage={FAVOURSPERPAGE} totalFavours={favours.length}
                    paginate={(pageNumber) => setCurrentPage(pageNumber)} />
            </div >
        </Container>
    )
}

export default Favours