import React from 'react';

const FavourSingleImage = (props) => {
    let sourceImage = '';
    if (props.favour.favourName === 'Breakfast') { sourceImage = '/favourImages/breakfast.jpg' }
    if (props.favour.favourName === 'Brunch') { sourceImage = '/favourImages/brunch.jpg' }
    if (props.favour.favourName === 'Bubble Tea') { sourceImage = '/favourImages/bubbletea.jpg' }
    if (props.favour.favourName === 'Coffee') { sourceImage = '/favourImages/coffee.png' }
    if (props.favour.favourName === 'Dessert') { sourceImage = '/favourImages/dessert.png' }
    if (props.favour.favourName === 'Dinner') { sourceImage = '/favourImages/dinner.png' }
    if (props.favour.favourName === 'Donuts') { sourceImage = '/favourImages/donuts.jpg' }
    if (props.favour.favourName === 'Drinks') { sourceImage = '/favourImages/drinks.png' }
    if (props.favour.favourName === 'Fast Food') { sourceImage = '/favourImages/fastfood.png' }
    if (props.favour.favourName === 'Chocolate') { sourceImage = '/favourImages/chocolate.png' }

    return (
        <img src={sourceImage} alt="favour proof" width="225" height="225" />
    );
}

export default FavourSingleImage;