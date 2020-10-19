import React from 'react';
import axios from 'axios';
import { withStyles, TextField, Box } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = (theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
})

class FavourFormUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        const url = '/api/user';
        (async () => {
            try {
                const res = await axios.get(url);
                const { data } = await res;
                this.setState({
                    users: data,
                })
            } catch (e) {
                console.log(e);
            }
        })();
    }

    render() {
        const { classes } = this.props;
        return (
            <Box className={classes.root}>
                <div>{this.props.oweMe ? (
                    <Autocomplete
                        id="combo-box-left-friend"
                        options={this.state.users}
                        getOptionLabel={option => option.firstName}
                        onChange={this.props.updateFriend}
                        style={{ width: 300, marginRight: 10 }}
                        renderInput={(params) =>
                            <TextField {...params}
                                label="Select a user"
                                variant="outlined"
                                required
                                margin="normal"
                                fullWidth
                            />}
                    />
                ) : (
                        <TextField
                            id="iOwe"
                            label="I"
                            fullWidth
                            disabled
                            margin="normal"
                            variant="outlined"
                            style={{ width: 300, marginRight: 10 }} />
                    )}</div>
                <p style={{ marginTop: 30 }}>{this.props.oweMe ? "Owes" : "Owe"}</p>
                <div>{this.props.oweMe ? (
                    <TextField
                        id="oweMe"
                        label="Me"
                        fullWidth
                        disabled
                        margin="normal"
                        variant="outlined"
                        style={{ width: 300, marginLeft: 10 }} />
                ) : (
                        <Autocomplete
                            id="combo-box-right-friend"
                            options={this.state.users}
                            getOptionLabel={option => option.firstName}
                            onChange={this.props.updateFriend}
                            style={{ width: 300, marginLeft: 10 }}
                            renderInput={(params) =>
                                <TextField {...params}
                                    label="Select a user"
                                    variant="outlined"
                                    required
                                    margin="normal"
                                    fullWidth
                                />}
                        />
                    )}</div>
            </Box>
        );
    }
}

export default withStyles(useStyles)(FavourFormUsers);