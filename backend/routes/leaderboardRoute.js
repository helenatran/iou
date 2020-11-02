const router = require('express').Router();
const leaderboard = require('../controllers/leaderboardController');

//GET request - get all users from the database
router.get('/', leaderboard.getRank);

module.exports = router;