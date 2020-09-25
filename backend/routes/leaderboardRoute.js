const router = require('express').Router();
const leaderboard = require('../controllers/leaderboard');

router.get('/', leaderboard.getRank);

module.exports = router;