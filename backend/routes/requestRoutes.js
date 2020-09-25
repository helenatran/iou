// import * as requestController from '../controllers/requestController';

const requestController = require('../controllers/requestController');

const routes = (app) => {
    app.route('/addNewRequest')
        //POST endpoint for adding new request
        .post(requestController.addNewRequest);
    
    app.route('/')

    app.route('/requests')
        .get(requestController.getAllRequests);
}

module.exports = routes;