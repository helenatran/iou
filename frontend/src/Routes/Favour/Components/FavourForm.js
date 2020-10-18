import React from 'react';
import axios from 'axios';
import FavourFormFavours from './FavourFormComponents/FavourFormFavours';
import FavourFormUsers from './FavourFormComponents/FavourFormUsers';
import FavourFormButtons from './FavourFormComponents/FavourFormButtons';
import FavourFormComments from './FavourFormComponents/FavourFormComments';
import FavourFormSwitch from './FavourFormComponents/FavourFormSwitch';
import FavourFormProofUpload from './FavourFormComponents/FavourFormProofUpload';
import { withStyles, Paper } from '@material-ui/core';

const useStyles = (theme) => ({
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
});

class FavourForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favour: {},
            selectedUserL: {},
            selectedUserR: {},
            comments: '',
            oweMe: false,
            proof: null,
            proofUrl: '',
            proofConfirmation: ''
        }
        this.updateFavour = this.updateFavour.bind(this);
        this.updateComments = this.updateComments.bind(this);
        this.updateSelectedUserL = this.updateSelectedUserL.bind(this);
        this.updateSelectedUserR = this.updateSelectedUserR.bind(this);
        this.updateOweMe = this.updateOweMe.bind(this);
        this.updateProof = this.updateProof.bind(this);
        this.submitFavour = this.submitFavour.bind(this);
    }

    updateFavour(object, value) {
        this.setState({
            favour: value.name
        })
    }

    updateComments(event) {
        this.setState({
            comments: event.target.value
        })
    }

    updateSelectedUserL(object, value) {
        this.setState({
            selectedUserL: value._id
        })
    }

    updateSelectedUserR(object, value) {
        this.setState({
            selectedUserR: value._id
        })
    }

    updateOweMe(event) {
        this.setState({
            oweMe: event.target.checked
        })
    }

    updateProof(event) {
        this.setState({
            proof: event.target.files[0],
            proofConfirmation: event.target.files[0].name
        })
    }

    async submitFavour(event) {
        event.preventDefault();

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

        const newFavour = {
            userId: this.state.selectedUserL,
            oweUserId: this.state.selectedUserR,
            favourName: this.state.favour,
            favourComment: this.state.comments,
            oweMe: this.state.oweMe,
            proof: this.state.proofUrl
        }

        console.log(newFavour);

        await axios.post('/api/favours', newFavour, {
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
        const { classes } = this.props;
        return (
            <div className={classes.root} >
                <Paper>
                    <div className={classes.title}><h1>Create Favour</h1></div>
                    <form noValidate autoComplete="off">
                        <FavourFormSwitch oweMe={this.state.oweMe} updateOweMe={this.updateOweMe} />
                        <FavourFormUsers
                            updateSelectedUserL={this.updateSelectedUserL}
                            updateSelectedUserR={this.updateSelectedUserR}
                        />
                        <FavourFormFavours updateFavour={this.updateFavour} />
                        <FavourFormComments comments={this.state.comments} updateComments={this.updateComments} />
                        <FavourFormProofUpload updateProof={this.updateProof} proofConfirmation={this.state.proofConfirmation} />
                        <FavourFormButtons submitFavour={this.submitFavour} />
                    </form>
                </Paper>
            </div >
        );
    }
}

export default withStyles(useStyles)(FavourForm)