import React from 'react';
import { Avatar } from '@material-ui/core';

const FavourListAvatar = ({ favourName }) => {
    let sourceImage = '';
    if (favourName === 'Breakfast') { sourceImage = '/favourImages/breakfast.jpg' }
    if (favourName === 'Brunch') { sourceImage = '/favourImages/brunch.jpg' }
    if (favourName === 'Bubble Tea') { sourceImage = '/favourImages/bubbletea.jpg' }
    if (favourName === 'Coffee') { sourceImage = '/favourImages/coffee.png' }
    if (favourName === 'Dessert') { sourceImage = '/favourImages/dessert.png' }
    if (favourName === 'Dinner') { sourceImage = '/favourImages/dinner.png' }
    if (favourName === 'Donuts') { sourceImage = '/favourImages/donuts.jpg' }
    if (favourName === 'Drinks') { sourceImage = '/favourImages/drinks.png' }
    if (favourName === 'Fast Food') { sourceImage = '/favourImages/fastfood.png' }
    if (favourName === 'Chocolate') { sourceImage = '/favourImages/chocolate.png' }

    return (
        <Avatar alt={favourName} src={sourceImage} />
    );
}

export default FavourListAvatar;