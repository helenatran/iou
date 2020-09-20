import React from 'react';

const FavourList = (props) => {
    return (
        <div>
            <ul>
                {props.favours.map((item) => (
                    <li key={item._id}>{item.favourName}</li>
                ))}
            </ul>
        </div>
    );
}

export default FavourList;