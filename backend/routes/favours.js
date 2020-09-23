const router = require('express').Router();
const favourController = require('../controllers/favourControllers');

router.get('/', favourController.getFavours);
router.post('/', favourController.createFavour);

module.exports = router;