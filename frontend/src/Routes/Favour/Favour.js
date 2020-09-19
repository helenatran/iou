import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
}));

export default function Favours() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h1>Favours</h1>
            <div>
                <Button variant="contained">I owe</Button>
                <Button variant="contained">Owe me</Button>
                <Button variant="contained">Past favours</Button>
            </div>
        </div>
    )
}