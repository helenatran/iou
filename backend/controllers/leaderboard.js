const User = require('../models/userModel');

module.exports.getRank = (req, res) => {
    User.find({})
        .sort([["requestsCompleted", -1]])
        .then((users) => {
            res.status(200).send(users);
        })
        .catch(err => res.status(400).json({'error': err}));
}
