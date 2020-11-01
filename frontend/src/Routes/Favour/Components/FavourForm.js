import React, { useState } from 'react';
import axios from 'axios';
import FavourFormFavours from './FavourFormComponents/FavourFormFavours';
import FavourFormUsers from './FavourFormComponents/FavourFormUsers';
import FavourFormButtons from './FavourFormComponents/FavourFormButtons';
import FavourFormComments from './FavourFormComponents/FavourFormComments';
import FavourFormSwitch from './FavourFormComponents/FavourFormSwitch';
import FavourFormProofUpload from './FavourFormComponents/FavourFormProofUpload';
import { makeStyles, Paper } from '@material-ui/core';
import getToken from '../../../Helpers/getToken';
import ErrorNotice from '../../Errors/Error';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 50,
        '& > *': {
            padding: theme.spacing(5, 30, 5, 30),
        },
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))

const FavourForm = () => {
    const classes = useStyles();
    const [favour, setFavour] = useState('');
    const [friend, setFriend] = useState('');
    const [comments, setComments] = useState('');
    const [oweMe, setOweMe] = useState(false);
    const [proof, setProof] = useState(null);
    const [proofUrl, setProofUrl] = useState('');
    const [proofConfirmation, setProofConfirmation] = useState('');
    const [error, setError] = useState([]);
    const [errorState, setErrorState] = useState();

    const submitFavour = async (event) => {
        event.preventDefault();
        setErrorState(false);

        if (proof) {
            const data = new FormData();
            data.append("file", proof, proofConfirmation);

            await axios.post('/api/proof/upload', data)
                .then((response) => {
                    console.log(response);
                    setProofUrl(response.data.data.Location);
                })
                .catch(err => console.log(err));
        }

        let userId, oweUserId, url = '';
        if (oweMe) { userId = friend; oweUserId = getToken().id; }
        else { userId = getToken().id; oweUserId = friend; }

        const newFavour = {
            userId: userId,
            oweUserId: oweUserId,
            favourName: favour,
            favourComment: comments,
            oweMe: oweMe,
            proof: proofUrl
        }

        if (oweMe) { url = '/api/favours/withProof' }
        else { url = '/api/favours' }

        await axios.post(url, newFavour, {
            headers: { "token": localStorage.getItem("token") }
        })
            .then(response => {
                console.log(response);
                window.location = '/favours';
            })
            .catch(err => {
                err.response.data.error && setError(err.response.data.error)
                setErrorState(true);
            })
    }

    return (
        <div className={classes.root} >
            <Paper>
                <div className={classes.title}><h1>Create Favour</h1></div>
                <form noValidate autoComplete="off">
                    {errorState === true ? <ErrorNotice message={error} /> : ""}
                    <FavourFormSwitch oweMe={oweMe} updateOweMe={(event) => setOweMe(event.target.checked)} />
                    <FavourFormUsers oweMe={oweMe}
                        updateFriend={(object, value) => {
                            if (value !== null) { setFriend(value._id); }
                            else { setFriend(''); }
                        }} />
                    <FavourFormFavours updateFavour={(object, value) => {
                        if (value !== null) { setFavour(value.name); }
                        else { setFavour(''); }
                    }} />
                    <FavourFormComments comments={comments} updateComments={(event) => {
                        setComments(event.target.value)
                    }} />
                    {oweMe ?
                        (<FavourFormProofUpload updateProof={(event) => {
                            setProof(event.target.files[0]);
                            setProofConfirmation(event.target.files[0].name);
                        }} proofConfirmation={proofConfirmation} />)
                        : ('')}
                    <FavourFormButtons submitFavour={submitFavour} />
                </form>
            </Paper>
        </div >
    );
}

export default FavourForm