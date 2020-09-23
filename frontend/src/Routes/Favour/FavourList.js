import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    gridRoot: {
        flexGrow: 1,
        margin: 2,
    },
    //Card
    cardRoot: {
        width: 275,
    },
}));

export default function FavourList(props) {
    const classes = useStyles();

    return (
        <div>
            <Grid container className={classes.gridRoot} spacing={3}>
                {props.favours.map((item) => (
                    <Grid item>
                        <Card className={classes.cardRoot}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography variant="h6">{item.favourName}</Typography>
                                    <Typography>Friend:</Typography>
                                    <Typography>Date: {item.timeCreated}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}