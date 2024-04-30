function hadleError(err, req, res, next) {
    console.log(err)
    let status = 500;
    let message = "Internal Server Error";
    if (err.name === "SequelizeValidationError") {
        status = 400;
        message = err.errors[0].message;
    } else if (err.name === "SequelizeDatabaseError") {
        status = 400
        message = err.errors[0].message;
    } else if (err.name === "SequelizeUniqueConstraintError") {
        status = 400;
        message = err.errors[0].message;
    } else if (err.name === "BadRequest") {
        status = 400;
        message = err.message;
    } else if (err.name === "JsonWebTokenError") {
        status = 401;
        message = err.message;
    } else if (err.name === "BlockedIps"){
        status = 403
        message = err.message
    }
    res.status(status).json({
        message,
    });
}

module.exports = hadleError;