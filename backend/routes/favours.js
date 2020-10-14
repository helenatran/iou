const router = require('express').Router();
const favourController = require('../controllers/favourControllers');

router.get('/', favourController.getFavours);
router.post('/', favourController.createFavour);
router.get('/:FavourId', favourController.getFavourWithID);

module.exports = router;