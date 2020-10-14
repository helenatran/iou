const router = require('express').Router();
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/checkAuth')

router.get('/', userController.getUsers);
router.get('/find', userController.findUserByID)
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser)

module.exports = router;