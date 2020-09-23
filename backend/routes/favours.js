const router = require('express').Router();
const favourController = require('../controllers/favourControllers');

router.get('/', favourController.getFavours);

module.exports = router;