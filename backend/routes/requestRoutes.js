const router = require('express').Router();
const requestController = require('../controllers/requestController');

// const routes = (app) => {
//     app.route('/addNewRequest')
//         //POST endpoint for adding new request
//         .post(requestController.addNewRequest);
    
//     app.route('/')

//     app.route('/requests')
//         .get(requestController.getAllRequests);
// }


router.get('/viewrequests', requestController.getAllRequests);
router.get('/viewdetails/', requestController.getARequest);
router.get('/:id', requestController.getRequestbyId);
router.post('/add', requestController.addNewRequest);

module.exports = router;