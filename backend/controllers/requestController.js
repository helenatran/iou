// requestController is for interfacing between the db and the frontend
// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const requestCollection = require('../models/requestModel');




/**
 * Create a request
 * make post to endpoint in routes, including a request body:
 * req body must contain the following fields {
 *      taskTitle: string,
 *      taskDescription: string,
 *      requesterId: objectID from user table,
 *      status: "Open",
 * }
 */
module.exports.addNewRequest = (req,res) => {
    // need to add user IDs
    let newRequest = new requestCollection(req.body);
    console.log("request object", newRequest);
    
    newRequest.save((err, requestObject) => {
        if (ex) {
            res.status(400).send(ex + " u did a fucky wucky :/"); 
        }
        res.status(200).json(requestObject);
    });
};

// Get a list of requests
module.exports.getAllRequests = (req,res) => {
    console.log("GET - all requests called");
    requestCollection.find().then((requests) => {
        res.status(200).send(requests);
        console.log("GET - all requests returned");
    }) 
    .catch((ex) => {
        res.status(400).json({ 'error': ex })
    });
};

//Get request by ID
/**
 * req.body should have request ID field
 */
module.exports.getARequest = (req, res) => {
    // res.send('/user id of ' + req.params.id + ' being hit');
    let requestId = req.params.id;
    requestCollection.findById(requestId, function(ex, request) {
        res.status(200).send(request);
    })
    .catch((ex) => {
        res.status(400).json({ 'error': ex })
    });
};

module.exports.SearchRequests = (req, res) => {
    console.log("GET - search requests called")
    //grab criteria from params

    //db find with conditions, return that
    // conditions: tasktitle, taskDecription or rewards contains keyword
};

module.exports.UpdateRequest = (req, res) => {
    console.log("POST - update requests called")

    //gets the id from body
};

module.exports.DeleteRequest = (req, res) => {
    console.log("POST - delete requests called")

    //get the id from body
    
    //check user id of request matches requester's user id


};

module.exports.getRequestbyId = (req, res) => {
    requestCollection.findById(req.params.id)
        .then((request) => {
            res.status(200).send(request);
        })
        .catch(err => res.status(400).json({ 'error': err }));
};


