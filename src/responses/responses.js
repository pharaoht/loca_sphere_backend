const successResponse = (res, data = null, message = 'Success', statusCode = 200) => {

    return res.status(statusCode).json({
        success: true,
        statusCode: statusCode,
        data: data, 
        message: message,
        error: false
    });
};

const errorResponse = (res, message = 'Internal server error', statusCode = 500) => {

    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message,
        error: true
    });
};

module.exports = {
    successResponse,
    errorResponse
}
