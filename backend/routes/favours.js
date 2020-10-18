const router = require('express').Router();
const favourController = require('../controllers/favourControllers');
const checkAuth = require('../middleware/checkAuth')

router.get('/', checkAuth, favourController.getFavours);
router.post('/', checkAuth, favourController.createFavour);
router.get('/:FavourId', checkAuth, favourController.getFavourWithID);
router.put('/:FavourId', checkAuth, favourController.updateFavour);
router.get('/user/:id', checkAuth, favourController.getAllUserFavours);


module.exports = router;