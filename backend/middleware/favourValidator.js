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
        .withMessage("The switch value is invalid, please try again")
]

module.exports.createFavourValidatorWithProof = [
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
    check('proof')
        .trim()
        .notEmpty()
        .withMessage("Please upload a proof")
]

module.exports.updateFavourValidator = [
    check('isCompleted')
        .not()
        .isIn([false])
        .withMessage("Please tick the box to mark the favour as completed")
]

module.exports.updateFavourValidatorWithProof = [
    check('isCompleted')
        .not()
        .isIn([false])
        .withMessage("Please tick the box to mark the favour as completed"),
    check('proof')
        .trim()
        .notEmpty()
        .withMessage("Please upload a proof")
]

