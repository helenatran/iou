const router = require('express').Router();
const requestController = require('../controllers/requestController');

router.get('/', requestController.getAllRequests);
router.get('/getRequest/:id', requestController.getARequest);

router.post('/add', requestController.addNewRequest);

module.exports = router;