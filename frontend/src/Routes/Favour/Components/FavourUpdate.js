import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Button, Checkbox, TextField } from '@material-ui/core';
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
    render() {
        const favour = this.props.location.state.favour;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper>
                    <h1>Update Favour: {favour.favourName}</h1>
                    <p>Friend: </p>
                    <label>I confirm the favour has been completed:
                    <Checkbox color="primary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}></Checkbox></label>
                    <TextField
                        id="outlined-multiline-static"
                        label="Comments"
                        multiline
                        rows={3}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        style={{ marginBottom: 15 }}
                    />
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file" />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span">Upload photo proof</Button>
                    </label>
                    <div className={classes.button}>
                        <Button variant="contained">Submit</Button>
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