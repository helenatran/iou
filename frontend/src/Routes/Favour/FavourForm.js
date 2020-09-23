import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const favours = [
    { name: 'Chocolate' },
    { name: 'Bubble Tea' },
    { name: 'Coffee' },
    { name: 'Cheese' },
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        textAlign: 'center',
        margin: theme.spacing(1)
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    input: {
        display: 'none',
    },
    textField: {
        margin: theme.spacing(1),
        width: '25ch',
    },
}));

export default function FavourForm(props) {
    const classes = useStyles();
    const [favour, setFavour] = React.useState();

    const handleChange = (event) => {
        setFavour(event.target.value);
    }

    return (
        <div className={classes.root}>
            <Typography variant="h3">Create a Favour</Typography>
            <form noValidate autoComplete="off">
                <div className={classes.form}>
                    <TextField required id="outlined-required" label="Name" variant="outlined" className={classes.textField} />
                    <p>Owes</p>
                    <TextField required id="outlined-required" label="Name" variant="outlined" className={classes.textField} />
                </div>
                <div className={classes.form}>
                    <TextField
                        required
                        id="outlined-select-favours"
                        select
                        label="Select a favour"
                        value={favour}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        style={{ margin: 8, }}>
                        {
                            favours.map((favour) => (
                                <MenuItem key={favour.name} value={favour.name}>{favour.name}</MenuItem>
                            ))
                        }
                    </TextField>

                    <TextField
                        id="outlined-multiline-static"
                        label="Comments"
                        multiline
                        rows={3}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        style={{ margin: 8 }}
                    />
                </div>
                <div className={classes.form}>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file" />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span">Upload photo proof</Button>
                    </label>
                </div>
                <div className={classes.form} style={{ marginTop: 8 }}>
                    <Button variant="contained">Submit</Button>
                </div>
            </form>
        </div >
    );
}