const { check } = require('express-validator');
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

/**
 * Create Favour Validator - Express Validator
 * Below are the required checks
    - "userId": String of an existing user object's ID 
    - "oweUserId": String of an existing user object's ID 
    - "favourName": String of a favour name which exists in our fixed list of favours
    - "oweMe": Boolean (not null)
*/
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

/**
 * Create Favour with Proof Validator - Express Validator
 * Below are the required checks
    - "userId": String of an existing user object's ID 
    - "oweUserId": String of an existing user object's ID 
    - "favourName": String of a favour name which exists in our fixed list of favours
    - "oweMe": Boolean (not null)
    - "proof": String of an image URL (not null)
*/
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

/**
 * Update Favour Validator - Express Validator
 * Below are the required checks
    - "isCompleted": Boolean (must be false)
*/
module.exports.updateFavourValidator = [
    check('isCompleted')
        .not()
        .isIn([false])
        .withMessage("Please tick the box to mark the favour as completed")
]

/**
 * Update Favour with Proof Validator - Express Validator
 * Below are the required checks
    - "isCompleted": Boolean (must be false)
    - "proof": String of image URL (must not be null)
*/
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

