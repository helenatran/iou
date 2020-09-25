// import { addNewRequest } from '../controllers/requestController.js';
// import '../controllers/requestController.js';
const controller = require('../controllers/requestController');
// const addNewRequest = require('../controllers/requestController.js');
const chai = require('chai');
const { getAllRequests, addNewRequest } = require('../controllers/requestController');
const assert = chai.assert;

let requests = [];
let str = 'monkey';

describe("testing tests", function () {
	beforeEach(function () {
		console.log('-----------beforeeach');
		str = 'cat';
	})

	it("should be cat dog", function () {
		str += "dog";
		assert.equal(str, 'catdog')
	});

	it("should be cat bug", function () {
		str += 'bug';
		assert.equal(str, 'catbug');
	});
});

describe("Requests", function () {

	describe("Create Requests", function () {
		before(function setupDummyData() {


		})
		// test case for making request with valid data -> should return request
		it("create requests with valid data should return the request just made", function () {
			
		})
		// test case for making request with invalid data -> should return error

		// testing the types of all the fields
	});

	describe("Read Requests", function () {
		it("Get all requests", function () {

		});

		describe("Get requests by search keyword", function () {
			// test case for one word -> requests contains the one word
			// test case for two words -> requests contain the two words together
			// test case for no search criteria -> returns all 
			// test case for word that no requests have -> no requests return
		});

		describe("Get requests by status", function () {
			// test case for open requests
			// test case for pending requests
			// test case for closed requests
		});

		describe("Get a user's request", function () {
			// test case for a user that exists
			// test case for user that doesnt exist
		});
	});

	describe("Update Requests", function () {

		describe("Update title and description fields", function () {
			//test case to edit title and description fields
		});

		describe("Update request status", function () {


		});

		describe("Request Rewards", function () {

		});
	});

	describe("Delete Requests", function () {

	});
});

console.log(str);
console.log(getAllRequests());
