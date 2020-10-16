const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/find', userController.findUserByID)
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/validateToken', userController.validateToken)

module.exports = router;