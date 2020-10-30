import React from 'react';
import axios from 'axios';
import { withStyles, Paper, Button, TextField } from '@material-ui/core';
import FavourUpdateCheckbox from './FavourUpdateComponents/FavourUpdateCheckbox';
import FavourUpdateComments from './FavourUpdateComponents/FavourUpdateComments';
import FavourUpdateProofUpload from './FavourUpdateComponents/FavourUpdateProofUpload';
import FavourUpdateButtons from './FavourUpdateComponents/FavourUpdateButtons';
import ErrorNotice from '../../Errors/Error';

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
    button: {
        display: 'flex',
        justifyContent: 'center',
        margin: 6
    },
})

class FavourUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favour: this.props.location.state.favour,
            isCompleted: false,
            comments: '',
            proof: null,
            proofUrl: '',
            proofConfirmation: '',
            error: [],
            errorState: false
        }
        this.handleCheck = this.handleCheck.bind(this);
        this.updateFavour = this.updateFavour.bind(this);
        this.updateComments = this.updateComments.bind(this);
        this.updateProof = this.updateProof.bind(this);
    }

    handleCheck(event) {
        this.setState({ isCompleted: event.target.checked })
    }

    updateComments(event) {
        this.setState({ comments: event.target.value })
    }

    updateProof(event) {
        this.setState({
            proof: event.target.files[0],
            proofConfirmation: event.target.files[0].name
        })
    }

    async updateFavour(event) {
        event.preventDefault();
        this.setState({
            error: [],
            errorState: false
        })

        if (this.state.proof) {
            const data = new FormData();
            data.append("file", this.state.proof, this.state.proofConfirmation);

            await axios.post('/api/proof/upload', data)
                .then((response) => {
                    this.setState({
                        proofUrl: response.data.data.Location
                    })
                    console.log(response);
                    console.log(this.state.proofUrl);
                })
                .catch(err => console.log(err));
        }

        const updatedFavour = {
            isCompleted: this.state.isCompleted,
            status: "completed",
            favourComment: this.state.comments,
            proof: this.state.proofUrl,
            timeCompleted: new Date().toISOString()
        }

        let url = '';
        if (this.state.favour.oweMe) { url = `/api/favours/${this.state.favour._id}`; }
        else { url = `/api/favours/${this.state.favour._id}/withProof` }

        await axios.put(url, updatedFavour, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log(response);
                window.location = '/favours'
            })
            .catch(err => {
                const error = err.response.data.error;
                console.log(error);
                this.setState({
                    error: error,
                    errorState: true
                })
            })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper>
                    {this.state.errorState === true ? <ErrorNotice message={this.state.error} /> : ""}
                    <h1>Update Favour: {this.state.favour.favourName}</h1>
                    <p>Friend: {this.state.favour.oweMe ? (this.state.favour.owner.firstName) : (this.state.favour.ower.firstName)}</p>
                    <FavourUpdateCheckbox isCompleted={this.state.isCompleted} handleCheck={this.handleCheck} />
                    <FavourUpdateComments comments={this.state.comments} updateComments={this.updateComments} />
                    <FavourUpdateProofUpload favour={this.state.favour} updateProof={this.updateProof} proofConfirmation={this.state.proofConfirmation} />
                    <FavourUpdateButtons updateFavour={this.updateFavour} />
                </Paper>
            </div>
        );
    }
}

export default withStyles(useStyles)(FavourUpdate);