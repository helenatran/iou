const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'email',
            passportField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await User.create({email, password});

                return done(null, user);
            } catch (error) {
                done(error)
            }
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });

                if (!user) {
                    return done(null, false, {
                        message: 'Username or Password is incorrect'
                    });
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false {
                        message: 'Username or Password is incorrect'
                    });
                }

                return done(null, user, {
                    message: 'Logged in successfully'
                });
            } catch (error) {
                return done(error);
            }
        }
    )
)