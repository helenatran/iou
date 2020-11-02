const User = require('../models/userModel');

/**
 * Get all existing users
 * GET request that sorts users by descending order of requestsCompleted
 */
module.exports.getRank = (req, res) => {
    User.find({})
        .sort([["requestsCompleted", -1]])
        .then((users) => {
            res.status(200).send(users);
        })
        .catch(err => res.status(400).json({'error': err}));
}
