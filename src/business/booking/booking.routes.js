const express = require('express');

const { httpCreateBooking } = require('./booking.controller');

const authenticateJWT = require('../../middleware/authenticate/auth.middleware');

const resource = '/bookings';

const bookingRouter = express.Router();

bookingRouter.post(`${resource}/create`, authenticateJWT, httpCreateBooking);

bookingRouter.post(`${resource}/update-status/:status`, authenticateJWT, '')

module.exports = bookingRouter;