const { check } = require('express-validator');
const Favour = require('../models/favourModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

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

module.exports.createFavourValidator = [
    check('userId')
        .trim()
        .isMongoId()
        .withMessage("This user does not exist")
        .custom(async value => {
            const userId = mongoose.Types.ObjectId(value)
            const user = await User.find({ _id:userId });
            if (!user.length > 0)
                return Promise.reject('That user does not exist, please select a valid user');
        }),
    check('oweUserId')
        .trim()
        .custom(async value => {
            const userId = mongoose.Types.ObjectId(value)
            const user = await User.find({ _id:userId });
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
        .withMessage("The switch value is invalid, please try again"),
]

