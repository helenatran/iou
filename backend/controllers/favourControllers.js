const Favour = require('../models/favourModel');
const User = require('../models/userModel');

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

module.exports.getUserFavours = async (req, res) => {
    try {
        const userOwnedFavours = await Favour.find({
            "userId": req.params.id
        });
        const userOwedFavours = await Favour.find({
            "oweUserId": req.params.id
        })
        return res.status(200).json({
            ownedFavours: userOwnedFavours,
            owedFavours: userOwedFavours
        })
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}

module.exports.getAllUserFavours = async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user)
        return res.status(400).json({
            error: 'The user could not be found'
        })
    
    let users = await User.find();

    let userOwns = await Favour.find({ 
        "userId": req.params.id
    }) 

    let userOwed = await Favour.find({
        "oweUserId": req.params.id
    })

    console.log(userOwns);
    console.log(userOwed);

    const getUserNames = (id, list) => {
        let favoursWithUserNames = {}
        for (let i = 0; i < list.length; ++i) {
            // console.log("1 " + list[i]._id.toString());
            // console.log("2 " + id.toString());
            if (list[i]._id.toString() === id.toString()) {
                favoursWithUserNames = {
                    _id: list[i]._id,
                    firstName: list[i].firstName,
                    lastName: list[i].lastName
                }
            }
        }
        return favoursWithUserNames;
    }

    const favourPayload = list => 
        list.map(favour => {
            return {
                _id: favour._id,
                isCompleted: favour.isCompleted,
                oweMe: favour.oweMe,
                status: favour.status,
                owner: getUserNames(favour.userId, users),
                ower: getUserNames(favour.oweUserId, users),
                favourName: favour.favourName,
                favourComment: favour.favourComment,
                timeCreated: favour.timeCreated,
            };
        })
    
    let favoursOwned = favourPayload(userOwns);
    let favoursOwed = favourPayload(userOwed);

    let mergedFavours = [
        ...favoursOwned,
        ...favoursOwed
    ]

    const owned = mergedFavours.filter(favour => favour.oweMe === false)
    const owed = mergedFavours.filter(favour => favour.oweMe === true)
    const completed = mergedFavours.filter(favour => favour.isCompleted === true && favour.oweMe === false)

    try {
        return res.status(200).json({
            owned: owned,
            owed: owed,
            completed: completed,
        })
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
}

module.exports.getFavourWithID = (req, res) => {
    Favour.findById(req.params.FavourId)
        .then((favour) => {
            res.status(200).send(favour);
        })
        .catch(err => res.status(400).json({ 'error': err }));
};