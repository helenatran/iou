const requestCollection = require('../models/requestModel');

/**
 * Create a request
 * POST request - requires minimum these fields in body:
    "taskTitle":String,
    "taskDescription":String,
    "requesterUserId" : String of user id,
    "status": "Open",
    "requestExpiry":"", (optional)
    "rewards": [{"rewarderId": "5f58e18452ae84695c5105d6", "rewardItem": "1 coffee"}]
    
    Other fields not mentioned: proof, completerId
 */
module.exports.CreateRequest = (req,res) => {
    let newRequest = new requestCollection(req.body);
    
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
    requestCollection.find().sort({"timeCreated": "desc"}).then((requests) => {
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
    let update = req.body.requestChanges;

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

/**
 * Delete Request
 * DELETE request - requires requestId field in the body
 */
module.exports.DeleteRequest = (req, res) => {
    requestCollection.findByIdAndDelete(
        { _id: req.body.requestId },
        function(err, result) {
            if (err) {
                res.status(400).json({ 'error': err });
            } else {
                res.status(200).send(result);
            }
        }); 
};
