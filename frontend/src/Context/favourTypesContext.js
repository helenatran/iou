import React, {useState, createContext} from 'react';

export const FavourTypesContext = createContext();


export const FavourTypeProvider = (props) => {
    const [favourTypes, setFavoursTypes] = useState([
        "Breakfast", "Dinner", 
        "Brunch", "Bubble Tea",
        "Drinks", "Coffee", 
        "Chocolate", "Dessert", 
        "Fast Food", "Donuts"
    ]);
    
    return (
        <FavourTypesContext.Provider value={[favourTypes, setFavoursTypes]}>
            {props.children}
        </FavourTypesContext.Provider>
    );
}