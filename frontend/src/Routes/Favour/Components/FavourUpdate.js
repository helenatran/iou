import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles, Paper } from '@material-ui/core';
import FavourUpdateCheckbox from './FavourUpdateComponents/FavourUpdateCheckbox';
import FavourUpdateComments from './FavourUpdateComponents/FavourUpdateComments';
import FavourUpdateProofUpload from './FavourUpdateComponents/FavourUpdateProofUpload';
import FavourUpdateButtons from './FavourUpdateComponents/FavourUpdateButtons';
import ErrorNotice from '../../Errors/Error';

const useStyles = makeStyles((theme) => ({
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
    button: {
        display: 'flex',
        justifyContent: 'center',
        margin: 6
    },
}))

const FavourUpdate = (props) => {
    const classes = useStyles();
    const [favour, setFavour] = useState(props.location.state.favour);
    const [isCompleted, setIsCompleted] = useState(false);
    const [comments, setComments] = useState('');
    const [proof, setProof] = useState(null);
    const [proofUrl, setProofUrl] = useState('');
    const [proofConfirmation, setProofConfirmation] = useState('');
    const [error, setError] = useState([]);
    const [errorState, setErrorState] = useState();

    const updateFavour = async (event) => {
        event.preventDefault();
        setErrorState(false);

        if (proof) {
            const data = new FormData();
            data.append("file", proof, proofConfirmation);

            await axios.post('/api/proof/upload', data)
                .then((response) => {
                    setProofUrl(response.data.data.Location);
                    console.log(response);
                })
                .catch(err => console.log(err));
        }

        const updatedFavour = {
            isCompleted: isCompleted,
            status: "completed",
            favourComment: comments,
            proof: proofUrl,
            timeCompleted: new Date().toISOString()
        }

        let url = '';
        if (favour.oweMe) { url = `/api/favours/${favour._id}`; }
        else { url = `/api/favours/${favour._id}/withProof` }

        await axios.put(url, updatedFavour, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(response => {
                window.location = '/favours'
            })
            .catch(err => {
                err.response.data.error && setError(err.response.data.error)
                setErrorState(true);
            })
    }

    return (
        <div className={classes.root}>
            <Paper>
                {errorState === true ? <ErrorNotice message={error} /> : ""}
                <h1>Update Favour: {favour.favourName}</h1>
                <p>Friend: {favour.oweMe ? (favour.owner.firstName) : (favour.ower.firstName)}</p>
                <FavourUpdateCheckbox isCompleted={isCompleted}
                    handleCheck={(event) => setIsCompleted(event.target.checked)} />
                <FavourUpdateComments comments={comments}
                    updateComments={(event) => setComments(event.target.value)} />
                <FavourUpdateProofUpload favour={favour} proofConfirmation={proofConfirmation}
                    updateProof={(event) => {
                        setProof(event.target.files[0]); setProofConfirmation(event.target.files[0].name);
                    }} />
                <FavourUpdateButtons updateFavour={updateFavour} />
            </Paper>
        </div>
    );
}

export default FavourUpdate;