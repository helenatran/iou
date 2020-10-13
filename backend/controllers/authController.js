const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

// module.exports.registerUser = async (req, res, next)  => {
//   try {
//     let userEmail = req.body.email;
    
//     let checkUser = await User.findOne({ 
//       email: userEmail 
//     })

//     if (checkUser != null)
//       return res.status(400).json({
//         Error: 'The email address you entered already exists in the system'
//       })
//     else {
//       passport.authenticate('register', {
//         session: false
//       }),
//       async (req, res, next) => {
//         res.json({
//           message: 'Signup successful',
//           user: req.user
//         })
//       }}
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     })
//   }
// }

passport.use(
    'register',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      async ( req, email, password, done) => {
        try {
          const firstName = req.body.firstName;
          const lastName = req.body.lastName;
          const requestsCompleted = 0;
          const user = await User.create({ firstName, lastName, email, password, requestsCompleted });

          return done(null, user);
        } catch (error) {
            return (error);
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
                    return done(null, false, {
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

passport.use(
    new JWTstrategy(
      {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );