const { validationResult } = require('express-validator');

module.exports.runValidator = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(422).json({
            error: formatErrors(validationErrors.errors)
        })
    }
    next();
}

// We only need the error message to populate error notices on the front end
function formatErrors(errors) {
    return errors.map(err => {
        return {
            error: err.msg,
        }
    })
}