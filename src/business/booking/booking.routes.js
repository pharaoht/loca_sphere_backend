const express = require('express');

const { httpCreateBooking, httpUpdateBookingStatus, httpGetBookingById, httpDeleteBookingById, httpCheckAvailability } = require('./booking.controller');

const authenticateJWT = require('../../middleware/authenticate/auth.middleware');

const resource = '/bookings';

const bookingRouter = express.Router();

bookingRouter.get(`${resource}/check-availability/:listingId`, httpCheckAvailability);

bookingRouter.get(`${resource}/:id`, authenticateJWT, httpGetBookingById);

bookingRouter.post(`${resource}/create`, authenticateJWT, httpCreateBooking);

bookingRouter.patch(`${resource}/update-status`, authenticateJWT, httpUpdateBookingStatus);

bookingRouter.delete(`${resource}/:bkId`, authenticateJWT, httpDeleteBookingById)

module.exports = bookingRouter;