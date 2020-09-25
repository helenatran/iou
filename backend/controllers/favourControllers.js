const Favour = require('../models/favourModel');

const createFavour = (req, res) => {
    let newFavour = new Favour(req.body);
    newFavour.save((err, Favour) => {
        if (err) {
            res.send(err);
        }
        res.json(Favour);
    })
}

const getFavours = (req, res) => {
    Favour.find({}, (err, Favour) => {
        if (err) {
            res.send(err);
        }
        res.json(Favour);
    });
};

module.exports = createFavour;
module.exports = getFavours;