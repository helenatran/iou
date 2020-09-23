const User = require('../models/userModel');

module.exports.getUsers = (req, res) => {
    User.find()
        .then((users) => {
            res.status(200).send(users);
        })
        .catch(err => res.status(400).json({'error': err}));
}