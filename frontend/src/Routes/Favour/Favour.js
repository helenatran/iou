import React from 'react'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FavourList from './FavourList'

const useStyles = (theme) => ({
    root: {
        margin: theme.spacing(1),
    },
});

class Favours extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            favours: []
        };
    }

    componentDidMount() {
        const url = 'http://localhost:5000/favoursList';
        axios.get(url)
            .then((res) => {
                this.setState({
                    favours: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <h1>Favours</h1>
                <div>
                    <Button variant="contained">I owe</Button>
                    <Button variant="contained">Owe me</Button>
                    <Button variant="contained">Past favours</Button>
                </div>
                <FavourList favours={this.state.favours} />
            </div>
        )
    }
}

//export default Favours;
export default withStyles(useStyles)(Favours)