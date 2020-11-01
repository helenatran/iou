const requestCollection = require('../models/requestModel');
const mongoose = require('mongoose');
const User = require('../models/userModel')
/**
 * Create a request
 * POST request - requires minimum these fields in body:
    "taskTitle":String,
    "taskDescription":String,
    "requesterUserId" : String of user id,
    "status": "Open",
    "rewards": array of reward objects { rewarderId: String, rewardItem: String, rewarderName: String }
    Other fields not mentioned: proof, completerId
 */
module.exports.CreateRequest = (req,res) => {
    let newRequest = new requestCollection(req.body);

    //To-do rewards array validation
    if (!rewardsArrayValidator(req.body.rewards))
        return res.status(422).json({
            error: "The reward you are trying to add is invalid"
        })
    newRequest.save((err, requestObject) => {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(requestObject);
    });
};

/**
 * Get all requests (sorted by latest first)
 * GET request - no need for params/body fields
 */
module.exports.getAllRequests = (req,res) => {
    const query  = requestCollection.where({ status: 'Open' });
    query.find().sort({"timeCreated": "desc"}).then((requests) => {
        res.status(200).send(requests);
    }) 
    .catch((err) => {
        res.status(400).json({ 'error': err })
    });
};

/**
 * Get Request by ID
 * GET request - requires id in the params
 */
module.exports.getRequestbyId = (req, res) => {
    console.log('get a request:')
    console.log(req.params.id);
    requestCollection.findById(req.params.id)
        .then((request) => {
            res.status(200).send(request);
        })
        .catch(err => res.status(400).json({ 'error': err }));
};

/**
 * Update Request
 * PATCH request - requires:
 *  - RequestChanges object in the body with all the fields that have changed
 *  - requestID field in the body with string of request's object id
 */
module.exports.UpdateRequest = (req, res) => {
    if (!rewardsArrayValidator(req.body.requestChanges))
        return res.status(422).json({
            error: "The reward you are trying to add is invalid"
        })
        let update = req.body.requestChanges;
        if (update.status === "Closed")
            awardRequestCompleted(update.completerUserId);
        requestCollection.findByIdAndUpdate(
        { _id: req.body._id },
        update,
        function(err, result) {
            if (err) {
                res.status(400).json({ 'error': err });
            } else {
                res.status(200).send(result);
            }
        }); 

};

async function awardRequestCompleted(id) {
    User.findById(id, function(err, user) {
        if(!user) {  // not found
            console.log("User not found");
        }
        console.log("before:" + user.requestsCompleted)
        user.requestsCompleted = user.requestsCompleted + 1;
        console.log("after:" + user.requestsCompleted)
        user.save()
            .then(user => {
                console.log("Updated Requests Completed")
            })
            .catch(err => {
                console.log("Could not update the thing")
            });
    });
}

function rewardsArrayValidator(rewardsArray) {
    const favours = [
        "Breakfast", 
        "Dinner", 
        "Brunch", 
        "Bubble Tea",
        "Drinks", 
        "Coffee", 
        "Chocolate", 
        "Dessert", 
        "Fast Food", 
        "Donuts"
    ];
    for (let i = 0; i < rewardsArray.length; ++i) {
        try {
            const userId = mongoose.Types.ObjectId(rewardsArray[i].rewarderId);
            const user = User.findById({ userId })
            if (!user)
                return false;
            if (!favours.includes(rewardsArray[i].rewardItem))
                return false;
        } catch (error) {
            return false;
        }
    }
    return true;
}

/**
 * Delete Request
 * DELETE request - requires requestId field in the body
 */
module.exports.DeleteRequest = async (req, res) => {
    await requestCollection.findById(req.params.id, function(err, request) {
        if(!request)
            return res.status(400).json({ message: "That request could not be found"})
        request.deleteOne()
            .then(request => {
                res.status(200).json({ message: "The request has been successfully deleted"})
            })
            .catch(err => {
                return res.status(400).json({ error: "The request could not be deleted"})
            })
    })
};
