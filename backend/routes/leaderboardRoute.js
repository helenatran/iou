const router = require('express').Router();
const leaderboard = require('../controllers/leaderboardController');

router.get('/', leaderboard.getRank);

module.exports = router;