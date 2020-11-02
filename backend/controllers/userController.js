const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const mongoose = require('mongoose');

/*
 * Registers a user to the system
 * POST request - receive these validated fields from userValidator:
    "firstName":String,
    "lastName":String,
    "email" : String,
    "password": "String",
 */
module.exports.registerUser = async (req, res) => {
    // Salt and hash the plain text password provided by the user
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new object containing the user details
    const registeredUser = new User({
        ...req.body,
        password: hashedPassword,
    });

    // Attempt to save new object and notify user of outcome
    try {
        await registeredUser.save();
        return res.status(200).json({
            message: 'User successfully registered'
        })
    } catch (error) {
        return res.status(500).json({
            error: [{
                error: 'Could not register your details, please try again'
            }]
        })
    };
}

/*
 * Allows user to login and authenticate to the system
 * POST request - receive these validated fields from userValidator:
    "email" : String,
    "password": "String",
 */
module.exports.loginUser = async (req, res) => {
    // Check that the user exists in the system
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json({
            error: [{
                error: 'That email or password was incorrect'
            }]
        })

    // Check that supplied password matches registered password
    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword)
        return res.status(400).json({
            error: [{
                error: 'That email or password was incorrect'
            }]
        })

    // Only the userID is needed on the front end for now
    const jwtPayload = {
        id: user._id,
    }
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET);

    return res.json({
        success: {
            token,
            user: {
                id: user._id,
                firstName: user.firstName
            },
            message: 'Successful Authentication'
        }
    })
}

/*
 * Internal helper method for the front end, returns true if token is valid, false if token invalid
 * POST request - receives this header from the front end:
    "token": "String",
 */
module.exports.validateToken = async (req, res) => {
    // If the header has not been supplied, return false
    const token = req.header("token");
    if (!token)
        return res.json(false);

    try {
        // Verify token and return true if user exists
        let verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.id);
        if (!user)
            return res.json(false);
        else
            return res.json(true);
    } catch (error) {
        return res.json(false)
    }
}

/*
 * Internal helper method for the front end, tries to find an existing user
 * GET request - receives this header from the front end:
    "token": "String",
 * Part of the authentication code from:
   - https://www.youtube.com/watch?v=sWfD20ortB4&ab_channel=Devistry
   - https://github.com/jgbijlsma/mern-auth-template-back/blob/master/routes/userRouter.js
 */
module.exports.findUserByID = async (req, res) => {
    try {
        // Receive JWT from front end and decode
        let encodedUserID = req.header("token");
        let decodedToken = jwt.verify(encodedUserID, process.env.JWT_SECRET)

        // Return error if no user exists
        const user = await User.findById(decodedToken.id);
        if (!user)
            return res.status(404).json({
                error: 'User could not be found'
            })


        return res.status(200).json({
            id: user._id,
            firstName: user.firstName
        })
    } catch (error) {
        return res.status(500).json({
            error: [{
                error: 'That user could not be found'
            }]
        })
    }
}

/*
 * Internal helper method for the front end, returns the logged in users names
 * POST request - receives this header from the front end:
    "token": "String",
 */
module.exports.getUserName = async (req, res) => {
    try {
        let encodedUserID = req.header("token");
        let decodedToken = jwt.verify(encodedUserID, process.env.JWT_SECRET)
        const user = await User.findById(decodedToken.id);
        if (!user)
            return res.status(404).json({
                error: [{
                    error: 'That user could not be found'
                }]
            })
        return res.status(200).json(user.firstName)
    } catch (error) {
        return res.status(500).json({
            error: [{
                error: 'That user could not be found'
            }]
        })
    }
}

/*
 * Retrieves entire user list from MongoDB
 * GET request - no fields needed to be received
 */
module.exports.getUsers = async (req, res) => {
    await User.find()
        .then((users) => {
            res.status(200).send(users);
        })
        .catch(err => {
            res.status(400).json({
                error: [{
                    error: 'Could not retrieve users'
                }]
            })
        })
} 