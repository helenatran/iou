const Favour = require('../models/favourModel');
const User = require('../models/userModel');

/**
 * Create a favour
 * POST request - below are the required fields in body:
    "userId": String of the ID of the user who owes the favour,
    "oweUserId": String of the ID of the user to whom the other user owes a favour,
    "favourName": String
    "oweMe": Boolean (false by default)
    
    Other fields:
    "isCompleted": Boolean (set as false by default)
    "status": String (set as "pending" by default)
    "favourComment": String (optional)
    "proof": String of the image URL (required only when oweMe is true)
 */
module.exports.createFavour = async (req, res) => {
    if (req.body.oweUserId === req.body.userId)
        return res.status(400).json({
            error: [{
                error: 'You cannot owe yourself!'
            }]
        })
    let newFavour = new Favour(req.body);
    await newFavour.save((err, Favour) => {
        if (err) {
            return res.status(400).json({
                error: [{
                    error: 'Could not save to the database'
                }]
            })
        }
        res.json(Favour);
    })
};

/**
 * Get all favours (sorted by oldest to newest)
 * GET favours - no need for params/body fields
 */
module.exports.getFavours = async (req, res) => {
    await Favour.find()
        .then((favours) => {
            res.status(200).send(favours);
        })
        .catch(err => res.status(400).json({
            error: [{
                error: 'Could not retrieve from the database'
            }]
        }))
};

/**
 * Get all favours which belong to the current logged-in user (sorted by oldest to newest)
 * GET user's all favours - required current user ID
 */
module.exports.getAllUserFavours = async (req, res) => {
    // Check that the user exists before we proceed
    const user = await User.findById(req.params.id)
    if (!user)
        return res.status(400).json({
            error: [{
                error: 'The user could not be found'
            }]
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
            error: [{
                error: error
            }]
        })
    }
}

/**
 * Get Favour by ID
 * GET favour - requires favour ID in the params
 */
module.exports.getFavourWithID = async (req, res) => {
    await Favour.findById(req.params.FavourId)
        .then((favour) => {
            res.status(200).send(favour);
        })
        .catch(err => res.status(400).json({
            error: [{
                error: err
            }]
        }))
};

/**
 * Update Favour
 * PUT request - below are the required fields:
 *  - favourID: String of Favour's object ID
 *  - isCompleted: Boolean (set to true)
 * 
 * Other fields: 
 *  - favourComments: String (optional)
 *  - proof: String of image URL (required only when oweMe is false)
 */
module.exports.updateFavour = async (req, res) => {
    await Favour.findOneAndUpdate({ _id: req.params.FavourId }, req.body, { new: true })
        .then((favour) => {
            res.status(200).send(favour);
        })
        .catch(err => res.status(400).json({
            error: [{
                error: 'Could not be updated'
            }]
        }))
};

/**
 * Delete Favour
 * DELETE favour - requires favourID field in the body
 */
module.exports.deleteFavour = async (req, res) => {
    await Favour.deleteOne({ _id: req.params.FavourId })
        .then((favour) => {
            res.json({ message: 'Successfully deleted favour' });
        })
        .catch(err => res.status(400).json({ 'error': err }))
}
