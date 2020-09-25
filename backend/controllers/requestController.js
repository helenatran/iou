// requestController is for interfacing between the db and the frontend
// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const Request = require('../models/requestModel');

// import {RequestSchema} from '../models/requestModel';


// const Request = mongoose.model('Request', RequestSchema);

const addNewRequest = (req,res) => {
    let newRequest = new Request(req.body);
    
    newRequest.save((err, Request) => {
        if (err) {
            res.send(err);
        }
        res.JSON(Request);
    });
};

const getAllRequests = (req,res) => {
    Request.find({}).then((requests) => {
        res.send(requests);
    }) //todo add error catching
}

module.exports = { addNewRequest, getAllRequests };