const router = require('express').Router();
const favourController = require('../controllers/favourControllers');
const checkAuth = require('../middleware/checkAuth')
const { createFavourValidator, createFavourValidatorWithProof, updateFavourValidator, updateFavourValidatorWithProof } = require('../middleware/favourValidator')
const { runValidator } = require('../middleware/runValidator')

//GET request - get all favours from the database
router.get('/', checkAuth, favourController.getFavours);

//GET request - get all favours which are linked with the current logged-in user
router.get('/user/:id', checkAuth, favourController.getAllUserFavours);

//POST request - create a favour without proof (when oweMe is false)
router.post('/', checkAuth, createFavourValidator, runValidator, favourController.createFavour);

//POST request - create a favour with proof (when oweMe is true)
router.post('/withProof', checkAuth, createFavourValidatorWithProof, runValidator, favourController.createFavour);

//GET request - get a favour with its ID
router.get('/:FavourId', checkAuth, favourController.getFavourWithID);

//PUT request - update a favour without proof (when oweMe is true)
router.put('/:FavourId', checkAuth, updateFavourValidator, runValidator, favourController.updateFavour);

//PUT request - update a favour with proof (when oweMe is false)
router.put('/:FavourId/withProof', checkAuth, updateFavourValidatorWithProof, runValidator, favourController.updateFavour);

//DELETE request - delete the selected favour 
router.delete('/:FavourId', checkAuth, favourController.deleteFavour);

module.exports = router;