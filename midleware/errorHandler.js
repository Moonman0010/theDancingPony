const {constants} = require("../constants")
const errorHandler = (err,req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    if(statusCode == constants.NOT_FOUND)
    res.json({tilte:"Not Found",message: err.message, StackTrace: err.stack});
    if(statusCode == constants.VALIDATION_ERROR)
    res.json({tilte:"Validation Failed",message: err.message, StackTrace: err.stack});
    if(statusCode == constants.UNAUTHORISED)
    res.json({tilte:"Unauthorised",message: err.message, StackTrace: err.stack});
    if(statusCode == constants.FORBIDDEN)
    res.json({tilte:"Forbidden",message: err.message, StackTrace: err.stack});
    if(statusCode == constants.SERVER_ERROR)
    res.json({tilte:"Server Error",message: err.message, StackTrace: err.stack});
    console.log("no errors")
}

module.exports = errorHandler