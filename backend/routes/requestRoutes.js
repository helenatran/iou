const router = require('express').Router();
const requestController = require('../controllers/requestController');
const checkAuth = require('../middleware/checkAuth')
const { createRequestValidator, updateRequestValidation } = require('../middleware/requestValidator')
const { runValidator } = require('../middleware/runValidator')

router.get('/', requestController.getAllRequests);
router.get('/:id', requestController.getRequestbyId);
router.post('/create', checkAuth, createRequestValidator, runValidator, requestController.CreateRequest);
router.patch('/update', checkAuth, runValidator, requestController.UpdateRequest);
router.delete('/delete/:id', checkAuth, runValidator, requestController.DeleteRequest);

module.exports = router;