import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, Button, Paper, Box } from '@material-ui/core';

const favours = [
    { name: 'Chocolate' },
    { name: 'Bubble Tea' },
    { name: 'Coffee' },
    { name: 'Cheese' },
];

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
    box: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

export default function FavourForm(props) {
    const classes = useStyles();
    const [favour, setFavour] = React.useState();

    const handleChange = (event) => {
        setFavour(event.target.value);
    }

    return (
        <div className={classes.root}>
            <Paper>
                <Box className={classes.box}> <h1>Create Favour</h1> </Box>
                <form noValidate autoComplete="off">
                    <Box className={classes.box}>
                        <TextField required id="outlined-required" label="Name" variant="outlined" className={classes.textField} />
                        <p style={{ marginTop: 25 }}>Owes</p>
                        <TextField required id="outlined-required" label="Name" variant="outlined" className={classes.textField} />
                    </Box>
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
            </Paper>
        </div >
    );
}