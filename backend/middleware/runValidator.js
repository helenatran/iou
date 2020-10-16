const { validationResult } = require('express-validator');

module.exports.runValidator = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        console.log(validationErrors)
        return res.status(422).json({
            error: validationErrors
        })
    }
    
    next();
}