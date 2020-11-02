const { check, body } = require('express-validator');
const mongoose = require('mongoose')
const User = require('../models/userModel')

/**
 * validator for inputs from the create requestform in the frontend
 * requires: taskTitle, requesterUserId, status and rewardsarray
 */
module.exports.createRequestValidator = [
    check('taskTitle')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage("The task title must be between 3 and 30 characters long"),
    check('taskDescription')
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage("Please enter between 3 and 100 characters for the task description"),
    check('requesterUserId')
        .trim()
        .isMongoId()
        .withMessage("This user does not exist")
        .custom(async value => {
            const userId = mongoose.Types.ObjectId(value)
            const user = await User.find({ _id: userId });
            if (!user.length > 0)
                return Promise.reject('That user does not exist');
        }),
    check('status')
        .trim()
        .equals("Open")
        .withMessage("The status of the request is not open, please try again"),
    check('rewards')
        .isArray()
        .withMessage("The offered rewards are not in an array")
        .not()
        .isEmpty()
        .withMessage("You must add at least one reward to the request")
]