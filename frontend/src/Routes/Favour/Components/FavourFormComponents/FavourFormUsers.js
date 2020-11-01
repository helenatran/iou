import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, Box } from '@material-ui/core';
import FavourFormUsersIOwe from './FavourFormUsersComponents/FavourFormUsersIOwe';
import FavourFormUsersOweMe from './FavourFormUsersComponents/FavourFormUsersOweMe';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
}))

const FavourFormUsers = (props) => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const url = '/api/user';
        const getUsers = async () => {
            try {
                const res = await axios.get(url);
                const { data } = await res;
                setUsers(data)
            } catch (e) {
                console.log(e);
            }
        }; getUsers();
    }, [])

    return (
        <Box className={classes.root}>
            <FavourFormUsersIOwe users={users} oweMe={props.oweMe} updateFriend={props.updateFriend} />
            <p style={{ marginTop: 30 }}>{props.oweMe ? "Owes" : "Owe"}</p>
            <FavourFormUsersOweMe users={users} oweMe={props.oweMe} updateFriend={props.updateFriend} />
        </Box>
    );
}

export default FavourFormUsers;