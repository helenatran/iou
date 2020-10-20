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

module.exports.getAllUserFavours = async (req, res) => {
    // Check that the user exists before we proceed
    const user = await User.findById(req.params.id)
    if (!user)
        return res.status(400).json({
            error: 'The user could not be found'
        })

    // Get a list of all the users in the database
    let users = await User.find();

    // Get a list of all the favours that the user is owed
    let userOwns = await Favour.find({
        "userId": req.params.id
    })

    // Get a list of all the favours that the user owes
    let userOwed = await Favour.find({
        "oweUserId": req.params.id
    })

    // Method that will match the id of the user in the favour document with the id of the user in the users collection and return a new object
    const getUserNames = (id, list) => {
        let favoursWithUserNames = {}
        for (let i = 0; i < list.length; ++i) {
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

    // Construct a data object to send to the front end, we assign the object returned from getUserNames in the owner and ower
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
                proof: favour.proof,
                timeCreated: favour.timeCreated,
                timeCompleted: favour.timeCompleted
            };
        })

    // Create two new variables that contain the payload of the favours the user owes and is owed
    let favoursOwned = favourPayload(userOwns);
    let favoursOwed = favourPayload(userOwed);

    // https://medium.com/coding-at-dawn/how-to-use-the-spread-operator-in-javascript-b9e4a8b06fab
    // User the spread operator to create a merged object 
    let mergedFavours = [
        ...favoursOwned,
        ...favoursOwed
    ]

    // Filter the mergedFavours object and filter it based on whatever criteria you want
    // Good idea to decide if you want to return only the completed favours the user owes or also completed favours the user is owed
    const owned = mergedFavours.filter(favour => favour.oweMe === false && favour.isCompleted === false)
    const owed = mergedFavours.filter(favour => favour.oweMe === true && favour.isCompleted === false)
    const completed = mergedFavours.filter(favour => favour.isCompleted === true)
    //remove for now '&& favour.oweMe === false'

    // Send it :D
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

module.exports.updateFavour = async (req, res) => {
    await Favour.findOneAndUpdate({ _id: req.params.FavourId }, req.body, { new: true })
        .then((favour) => {
            res.status(200).send(favour);
        })
        .catch(err => res.status(400).json({ 'error': err }))
};
