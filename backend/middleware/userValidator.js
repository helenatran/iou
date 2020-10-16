const { check } = require('express-validator');

module.exports.registerUserValidator = [
    check('firstName')
        .notEmpty()
        .isLength({ min: 3, max: 50 })
        .withMessage("Your first name must not be empty and between 3 and 50 characters"),
    check('lastName')
        .notEmpty()
        .isLength({ min: 3, max: 50 })
        .withMessage("Your last name must not be empty and between 3 and 50 characters"),
    check('email')
        .notEmpty()
        .isEmail()
        .withMessage("Your email must not be empty and must be valid"),
    check('password')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
]

module.exports.loginUserValidator = [
    check('email')
        .notEmpty()
        .isEmail()
        .withMessage("Must be a valid email"),
    check('password')
        .notEmpty()
        .withMessage("Must be a valid password")
]