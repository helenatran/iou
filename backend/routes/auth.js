const passport = require('passport');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
//const User = require('../models/userModel');
//const { registerUser } = require('../controllers/authController');
require('../controllers/authController')

//router.post('/register', registerUser)

router.post(
    '/register',
    passport.authenticate('register', { session: false }),
    async (req, res, next) => {
      res.json({
        message: 'Signup successful',
        user: req.user
      });
    }
 );

router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
        'login',
        async (err, user, info) => {
            try {
            if (err || !user) {
                const error = new Error('An error occurred.');

                return next(error);
            }

            req.login(
                user,
                { session: false },
                async (error) => {
                if (error) return next(error);

                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'TOP_SECRET');

                return res.json({ token });
                }
            );
            } catch (error) {
            return next(error);
            }
        }
        )(req, res, next);
    }
);

module.exports = router;