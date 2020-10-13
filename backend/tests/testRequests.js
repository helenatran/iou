const requestsController = require('../controllers/requestController');
const userController = require('../controllers/users');
const User = require('../models/userModel');

const chai = require('chai');
const expect = require('chai').expect;

const assert = chai.assert;
const sinon = require('sinon');
// const mongoose = require('mongoose');

// let dummyUser1;
// let dummyUser2;

// let req1;
// let res1;

describe("scope", function() {
	let num = 3;
	it("testscope out of an it block", function() {
		assert.equal(num, 3);
	});
});


describe("Test Requests", function() {
	describe("Get requests", function() {
		before(function() {
			let getRequestsStub = sinon.stub(requestsController, 'getAllRequests').yields(null, null, JSON.stringify({ requests: ["request1", "request2", "request3"] }))
		});

		it("should add another object into the database", function(done) {
			requestsController.getAllRequests()
			.then((response) => {
				expect(response.requests).to.equal(["request1", "request2", "request3"]);
				doNotTrack();
			})
			.catch((err) => {
				done(err);
			})
			console.log(testRequest);
		});
	});
})

// describe("Requests", function () {

// 	describe("Create Requests", function () {
// 		before(function setupDummyData() {

// 			// // make users in the db
// 			// dummyUser1 = new User();
// 			// dummyUser2 = new User();
			
// 			// let request = new Request();

// 			// //request data
// 			// req1 = {
// 			// 	"taskTitle": "dummyRequest",
// 			// 	"taskDescription": "do this thing pls",
// 			// 	"requestExpiry": "2020-10-25T11:50:00",
// 			// 	"reward": [
//             //         {rewarder: "alice", reward: "2 chocolates"}, 
//             //         {rewarder: "bob", reward: "1 chocolate"}
//             //     ]
// 			// };
			
// 		});

// 		// test case for making request with valid data -> should return request
// 		it("Create requests with valid data should return the request just made", function () {
			
// 			// let result = requestsController.addNewRequest(req, res);

// 		})
// 		// test case for making request with invalid data -> should return error

// 		// testing the types of all the fields
// 	});

// 	describe("Regarding Reading Requests", function () {
// 		describe("Get all requests", function () {
			
// 			it("should return an array of 5 requests in a db collection with 5 documents", function() {
// 				let allRequests = requestsController.getAllRequests({},{});
// 				console.log('======================================HIT GET ALL REQUESTS TEST');
// 				// console.log("HELLO" + allRequests);
// 				// assert.equal(allRequests.length, 5)
// 			})

// 		});

// 		describe("Get requests by search keyword", function () {
// 		});

// 		describe("Get requests by status", function () {
// 		});

// 		describe("Get a user's request", function () {
// 		});
// 	});

// 	describe("Update Requests", function () {

// 		describe("Update title and description fields", function () {
// 		});

// 		describe("Update request status", function () {


// 		});

// 		describe("Request Rewards", function () {

// 		});
// 	});

// 	describe("Delete Requests", function () {

// 	});
// });
