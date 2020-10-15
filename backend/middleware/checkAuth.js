const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    try {
        const token = req.header("token");
        if (!token)
            return res.status(400).json({
                error: 'No authentication token found'
            });

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified)
            return res.status(400).json({
                error: 'Token is invalid'
            });

        req.user = verified.id;
        
        next();
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
}

module.exports = checkAuth;