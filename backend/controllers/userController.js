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
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const registeredUser = new User({
        ...req.body,
        password: hashedPassword,
    });

    try {
        await registeredUser.save();
        return res.status(200).json({
            message: 'User successfully registered'
        })
    } catch (error) {
        return res.status(500).json({
            error: [{
                error: 'Could not register your details, please try again'
            }]});
    };
}

/*
 * Allows user to login and authenticate to the system
 * POST request - receive these validated fields from userValidator:
    "email" : String,
    "password": "String",
 */
module.exports.loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user)
        return res.status(400).json({
            error: [{
                error: 'That email or password was incorrect'
            }]})

    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    
    if (!checkPassword)
        return res.status(400).json({
            error: [{
                error: 'That email or password was incorrect'
            }]})
    
    //Store the userID inside the JWT Payload for use on the front end
    const jwtPayload = {
        id: user._id,
    }

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET);

    res.json({
        success: {
            token,
            user: { id: user._id },
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

    const token = req.header("token");

    if (!token)
        return res.json(false);

    try {
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
 */
module.exports.findUserByID = async (req, res) => {
    try {
        let encodedUserID = req.header("token");
        let decodedToken = jwt.verify(encodedUserID, process.env.JWT_SECRET)

        const user = await User.findById(decodedToken.id);
        if (!user)
            return res.status(404).json({
                error: 'User could not be found'
            })

        return res.status(200).json({
            id: user._id,
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
                error: 'User could not be found'
            })
        return res.status(200).json(user.firstName)
    } catch (error) {
        return res.status(500).json({
            error: 'That user could not be found'
        })
    }
}

/*
 * Retrieves entire user list from MongoDB
 * GET request
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
                }]})
        })
} 