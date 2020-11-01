const { check } = require('express-validator');
const User = require('../models/userModel');


//Express validator check to check input of Register form
module.exports.registerUserValidator = [
    check('firstName')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("First name must be between 3 to 50 characters"),
    check('lastName')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("Last name must be between 3 to 50 characters"),
    check('email')
        .trim()
        .isEmail()
        .withMessage("Email must be valid email address")
        .custom(async value => {
            const user = await User.find({ email: value });
            if (user.length > 0)
                return Promise.reject('That email has already been registered');
        }),
    check('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
]

/*
 * Express validator check to check input of Login form
 * Accepts any non-empty, valid value and passes it to the login controller method
 */
module.exports.loginUserValidator = [
    check('email')
        .trim()
        .isEmail()
        .withMessage("Must be a valid email"),
    check('password')
        .trim()
        .notEmpty()
        .withMessage("Must be a valid password")
]