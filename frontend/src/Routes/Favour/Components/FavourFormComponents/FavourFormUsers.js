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
        const url = 'http://localhost:5000/api/users';
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
                <Autocomplete
                    id="combo-box-UserL"
                    options={this.state.users}
                    getOptionLabel={option => option.firstName}
                    onChange={this.props.updateSelectedUserL}
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
                <p style={{ marginTop: 30 }}>Owes</p>
                <Autocomplete
                    id="combo-box-UserR"
                    options={this.state.users}
                    getOptionLabel={option => option.firstName}
                    onChange={this.props.updateSelectedUserR}
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
            </Box>
        );
    }
}

export default withStyles(useStyles)(FavourFormUsers);