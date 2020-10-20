const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.registerUser = async (req, res) => {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const registeredUser = new User({
        ...req.body,
        password: hashedPassword,
    });

    try {
        const savedUser = await registeredUser.save();
        return res.status(200).json({
            message: 'User successfully registered'
        })
    } catch (error) {
        return res.status(500).json({
            error: 'There was an issue with registering your user, please try again'
        });
    };
}

module.exports.loginUser = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });
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
    
    const jwtPayload = {
        id: user._id,
    }

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET);

    res.json({
        success: {
            token,
            user: {
                id: user._id
            },
            message: 'Successful Authentication'
        }
    })
}

module.exports.validateToken = async (req, res) => {
    try {
        const token = req.header("token");
        if (!token)
            return res.json(false);

        let verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified)
            return res.json(false);

        const user = await User.findById(verified.id);
        if (!user)
            return res.json(false);

        return res.json(true);
    } catch (error) {
        return res.json(false)
    }
}

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
            error: 'That user could not be found'
        })
    }
}

module.exports.getUsers = async (req, res) => {
    await User.find()
        .then((users) => {
            res.status(200).send(users);
        })
        .catch(err => res.status(400).json({ 'error': err }));
} 