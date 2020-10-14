const router = require('express').Router();
const requestController = require('../controllers/requestController');

router.get('/', requestController.getAllRequests);
router.get('/:id', requestController.getRequestbyId);
router.post('/add', requestController.CreateRequest);
router.patch('/update', requestController.UpdateRequest);
router.delete('/delete', requestController.DeleteRequest);

module.exports = router;