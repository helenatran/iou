// requestController is for interfacing between the db and the frontend
// import mongoose from 'mongoose';
const { request } = require('express');
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
 *      reward: array of {rewarderId: object id for user, rewarditem}
 * }
 */
module.exports.CreateRequest = (req,res) => {
    // need to add user IDs
    let newRequest = new requestCollection(req.body.requestObject);
    
    newRequest.save((err, requestObject) => {
        if (err) {
            res.status(400).send(err); 
        }
        res.status(200).json(requestObject);
    });
};

// Get a list of requests
module.exports.getAllRequests = (req,res) => {
    requestCollection.find().then((requests) => {
        res.status(200).send(requests);
    }) 
    .catch((err) => {
        res.status(400).json({ 'error': err })
    });
};

//Get request by ID
/**
 * req.body should have request ID field
 */
module.exports.getARequest = (req, res) => {
    let requestId = req.params.id;
    requestCollection.findById(requestId, function(ex, request) {
        res.status(200).send(request);
    })
    .catch((err) => {
        res.status(400).json({ 'error': err })
    });
};

/**
 * request body must have the fields of the request that have changed
 */
module.exports.UpdateRequest = (req, res) => {
    let update = req.body.requestChanges;

    requestCollection.findByIdAndUpdate(
        { _id: req.body.requestId },
        update,
        function(err, result) {
            if (err) {
                res.status(400).json({ 'error': err });
            } else {
                res.status(200).send(result);
            }
        }); 

};

module.exports.DeleteRequest = (req, res) => {
    // res.send("delete request endpoint hit");
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

module.exports.getRequestbyId = (req, res) => {
    requestCollection.findById(req.params.id)
        .then((request) => {
            res.status(200).send(request);
        })
        .catch(err => res.status(400).json({ 'error': err }));
};


