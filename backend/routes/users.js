const router = require('express').Router();
const userController = require('../controllers/userController');
const { loginUserValidator } = require('../middleware/userValidator')
const { registerUserValidator } = require('../middleware/userValidator')
const { runValidator } = require('../middleware/runValidator')

router.get('/', userController.getUsers);
router.get('/find', userController.findUserByID)
router.post('/register', registerUserValidator, runValidator, userController.registerUser);
router.post('/login', loginUserValidator, runValidator, userController.loginUser);
router.post('/validateToken', userController.validateToken)

module.exports = router;