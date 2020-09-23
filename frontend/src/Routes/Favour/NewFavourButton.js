import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const NewFavourButton = () => {
    return (
        <Link><Button variant="contained">Create Favour</Button></Link>
    );
}

export default NewFavourButton;