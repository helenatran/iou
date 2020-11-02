/*
 * Authentication code mainly from:
   - https://github.com/jgbijlsma/mern-auth-template-back/blob/master/middleware/auth.js
   - https://www.youtube.com/watch?v=BKiiXXVb69Y&ab_channel=Devistry
   Aim is to pass the token of the user from the front end to the backend on calls to the API that require user to be logged in
   Then verify the validity of the user
 */
const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    try {
        //Check that token has been passed from the front end through a token header
        const token = req.header("token");
        if (!token)
            return res.status(400).json({
                error: 'No authentication token found'
            });

        //Check the validity of the token, return error if token invalid
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified)
            return res.status(401).json({
                error: 'Token is invalid'
            });
         
        //If user succcessfully verified, move to next middleware in the chain
        req.user = verified.id;
        next();
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
}

module.exports = checkAuth;