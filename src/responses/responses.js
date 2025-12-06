const successResponse = (res, data = null, message = 'Success', statusCode = 200) => {

    return res.status(statusCode).json({
        success: true,
        statusCode: statusCode,
        data: data, 
        message: message,
        error: false
    });
};

const errorResponse = (res, message = 'Internal server error', statusCode = 500, data = {}) => {

    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message,
        error: true,
        data: data
    });
};

module.exports = {
    successResponse,
    errorResponse
}
