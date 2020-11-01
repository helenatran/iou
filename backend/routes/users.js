const router = require('express').Router();
const userController = require('../controllers/userController');
const { loginUserValidator, registerUserValidator } = require('../middleware/userValidator')
const { runValidator } = require('../middleware/runValidator');
const checkAuth = require('../middleware/checkAuth');

router.get('/', userController.getUsers);
router.get('/find', userController.findUserByID)
router.post('/register', registerUserValidator, runValidator, userController.registerUser);
router.post('/login', loginUserValidator, runValidator, userController.loginUser);
router.post('/validateToken', userController.validateToken);
router.post('/name', checkAuth, userController.getUserName);

module.exports = router;