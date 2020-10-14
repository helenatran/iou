const Favour = require('../models/favourModel');

module.exports.createFavour = (req, res) => {
    let newFavour = new Favour(req.body);
    newFavour.save((err, Favour) => {
        if (err) {
            res.send(err);
        }
        res.json(Favour);
    })
};

module.exports.getFavours = (req, res) => {
    Favour.find()
        .then((favours) => {
            res.status(200).send(favours);
        })
        .catch(err => res.status(400).json({ 'error': err }));
};

module.exports.getFavourWithID = (req, res) => {
    Favour.findById(req.params.FavourId)
        .then((favour) => {
            res.status(200).send(favour);
        })
        .catch(err => res.status(400).json({ 'error': err }));
};