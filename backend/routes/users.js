const router = require('express').Router();
const userController = require('../controllers/userController');
const { loginUserValidator, registerUserValidator } = require('../middleware/userValidator')
const { runValidator } = require('../middleware/runValidator');

//GET request - get all users from the database
router.get('/', userController.getUsers);

//GET request - get user from database based on supplied id in request body
router.get('/find', userController.findUserByID)

//POST request - register a new user to the application
router.post('/register', registerUserValidator, runValidator, userController.registerUser);

//POST request - logs an existing user into the application
router.post('/login', loginUserValidator, runValidator, userController.loginUser);

//POST request - accept a JWT token from the frontend and verify its validity
router.post('/validateToken', userController.validateToken);

module.exports = router;