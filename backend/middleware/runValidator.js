const { validationResult } = require('express-validator');

module.exports.runValidator = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        console.log(validationErrors)
        return res.status(422).json({
            error: formatErrors(validationErrors.errors)
        })
    }
    next();
}

function formatErrors(errors) {
    return errors.map(err => {
        return {
            param: err.param,
            msg: err.msg,
        }
    })
}