const { check, body } = require('express-validator');
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
        .isMongoId().withMessage("Please select a user in the list")
        .custom(async value => {
            if (value !== '') {
                const userId = mongoose.Types.ObjectId(value)
                const user = await User.find({ _id: userId });
                if (!user.length > 0)
                    return Promise.reject('That user does not exist, please select a valid user');
            }
        }),
    check('oweUserId')
        .trim()
        .notEmpty().withMessage("Please select a user in the list")
        .custom(async value => {
            if (value !== '') {
                const userId = mongoose.Types.ObjectId(value)
                const user = await User.find({ _id: userId });
                if (!user.length > 0)
                    return Promise.reject('That user does not exist, please select a valid user');
            }
        }),
    check('favourName')
        .trim()
        .isIn(favours)
        .withMessage("Please select a favour in the list"),
    check('oweMe')
        .trim()
        .isBoolean()
        .withMessage("The switch value is invalid, please try again"),
    //Need errors when proof only for 'Owe Me'
    // check('proof')
    //     .trim()
    //     .notEmpty()
    //     .withMessage("Please upload a proof")
]

module.exports.updateFavourValidator = [
    // Need errors when the checkbox isn't checked and proof only for 'I Owe'
    // check('isCompleted')
    //     .trim()
    //     .isBoolean(), //true?
    // check('proof')
    //     .trim()
    //     .notEmpty()
    //     .withMessage("Please upload a proof")
]

