const { check } = require('express-validator');
const Favour = require('../models/favourModel');
const User = require('../models/userModel');

module.exports.registerUserValidator = [
    check('userId')
        .trim()
        .custom(async value => {
            const user = await User.findById({ value });
            if (!user.length > 0)
                return Promise.reject('That user does not exist, please select a valid user');
        }),
    check('oweUserId')
        .trim()
        .custom(async value => {
            const user = await User.findById({ value });
            if (!user.length > 0)
                return Promise.reject('That user does not exist, please select a valid user');
        }),
    check('favourName')
        .trim()
        .isIn(favours)
        .withMessage("That favour does not seem to exist, please select a valid favour"),
    check('oweMe')
        .trim()
        .isBoolean()
        .withMessage("The switch value is invalid, please try again")
];

const favours = [
    "Breakfast", 
    "Dinner", 
    "Brunch", 
    "Bubble Tea",
    "Drinks", 
    "Coffee", 
    "Chocolate", 
    "Dessert", 
    "Fast Food", 
    "Donuts"
];