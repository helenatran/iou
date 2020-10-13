const passport = require('passport');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
//const { registerUser } = require('../controllers/authController');
const AuthController = require('../controllers/authController')

//router.post('/register', AuthController.registerUser)

router.post(
    '/register',
    async (req, res, next) => {
      try {
        let userEmail = req.body.email;
        console.log(userEmail);
        let checkUser = await User.findOne({ email: userEmail })
        console.log(checkUser)
        if (checkUser != null)
          return res.status(400).json({
            Error: 'The email address you entered already exists in the system'
          })
        else {
          passport.authenticate('register', { session: false }),
            res.json({
              message: 'Signup successful',
              user: req.user
            });
        }
      } 
      catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message
        })
      }
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