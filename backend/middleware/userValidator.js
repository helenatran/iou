const { check } = require('express-validator');
const User = require('../models/userModel');

module.exports.registerUserValidator = [
    check('firstName')
        .isLength({ min: 3, max: 50 })
        .withMessage("Dirst name must be between 3 to 50 characters"),
    check('lastName')
        .isLength({ min: 3, max: 50 })
        .withMessage("Last name must be between 3 to 50 characters"),
    check('email')
        .isEmail()
        .withMessage("Email must be valid email address")
        .custom(async value => {
            console.log(value);
            const user = await User.find({ email: value });
            console.log(user)
            if (user)
                return Promise.reject('That email has already been registered');
        }),
    check('password')
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
]

module.exports.loginUserValidator = [
    check('email')
        .isEmail()
        .withMessage("Must be a valid email"),
    check('password')
        .notEmpty()
        .withMessage("Must be a valid password")
]