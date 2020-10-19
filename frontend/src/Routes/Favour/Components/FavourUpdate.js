import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Button, Checkbox, TextField } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';

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
    input: {
        display: 'none',
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
            proofConfirmation: ''
        }
        this.handleCheck = this.handleCheck.bind(this);
        this.updateFavour = this.updateFavour.bind(this);
        this.updateComments = this.updateComments.bind(this);
        this.updateProof = this.updateProof.bind(this);
    }

    handleCheck(event) {
        this.setState({
            isCompleted: event.target.checked
        })
    }

    updateComments(event) {
        this.setState({
            comments: event.target.value
        })
    }

    updateProof(event) {
        this.setState({
            proof: event.target.files[0],
            proofConfirmation: event.target.files[0].name
        })
    }

    async updateFavour(event) {
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

        const updatedFavour = {
            isCompleted: this.state.isCompleted,
            status: "completed",
            favourComment: this.state.comments,
            proof: this.state.proofUrl,
            timeCompleted: new Date().toLocaleString()
        }

        await axios.put(`/api/favours/${this.state.favour._id}`, updatedFavour, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log(response);
                window.location = '/favours'
            })
            .catch(err => console.log(err))
    }

    render() {
        // const favour = this.props.location.state.favour;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper>
                    <h1>Update Favour: {this.state.favour.favourName}</h1>
                    <p>Friend: {this.state.favour.oweMe ? (this.state.favour.owner.firstName) : (this.state.favour.ower.firstName)}</p>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={this.state.isCompleted}
                                    onChange={this.handleCheck}
                                />
                            }
                            label="I confirm the favour has been completed:"
                            labelPlacement="start"
                            style={{ marginLeft: 0 }}

                        />
                    </FormGroup>
                    <TextField
                        id="outlined-multiline-static"
                        label="Comments"
                        multiline
                        rows={3}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={this.state.comments}
                        onChange={this.updateComments}
                        style={{ marginBottom: 15 }}
                    />
                    <div>{this.state.favour.oweMe ? ('') : (
                        <div className={classes.button}>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={this.updateProof} />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">Upload photo proof</Button>
                            </label>
                            <p style={{ marginTop: 5, marginLeft: 5 }}>{this.state.proofConfirmation}</p>
                        </div>
                    )}</div>
                    <div className={classes.button}>
                        <Button variant="contained" type="submit" onClick={this.updateFavour}>Submit</Button>
                    </div>
                    <div className={classes.button}>
                        <Link to={`/favours`}><Button variant="contained">Cancel</Button></Link>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default withStyles(useStyles)(FavourUpdate);