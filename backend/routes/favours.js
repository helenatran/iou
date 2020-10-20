const router = require('express').Router();
const favourController = require('../controllers/favourControllers');
const checkAuth = require('../middleware/checkAuth')
const { createFavourValidator, updateFavourValidator } = require('../middleware/favourValidator')
const { runValidator } = require('../middleware/runValidator')

router.get('/', checkAuth, favourController.getFavours);
router.post('/', checkAuth, createFavourValidator, runValidator, favourController.createFavour);
router.get('/:FavourId', checkAuth, favourController.getFavourWithID);
router.put('/:FavourId', checkAuth, updateFavourValidator, runValidator, favourController.updateFavour);
router.get('/user/:id', checkAuth, favourController.getAllUserFavours);


module.exports = router;