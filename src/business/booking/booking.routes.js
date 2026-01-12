const express = require('express');

const { idempotencyMiddleware } = require('../../middleware/idempotency/idempotency.middleware');

const { httpCreateBooking, httpUpdateBookingStatus, httpGetBookingById, httpDeleteBookingById, httpCheckAvailability, httpGetAvailabilityForListing } = require('./booking.controller');

const authenticateJWT = require('../../middleware/authenticate/auth.middleware');

const resource = '/bookings';

const bookingRouter = express.Router();

bookingRouter.get(`${resource}/check-availability/:listingId`, httpCheckAvailability);

bookingRouter.get(`${resource}/get-availability/:listingId`, httpGetAvailabilityForListing);

bookingRouter.get(`${resource}/get-bookings`, authenticateJWT, httpGetBookingById);

bookingRouter.post(`${resource}/create`, authenticateJWT, idempotencyMiddleware, httpCreateBooking);

bookingRouter.patch(`${resource}/update-status`, authenticateJWT, idempotencyMiddleware, httpUpdateBookingStatus);

bookingRouter.delete(`${resource}/:bkId`, authenticateJWT, httpDeleteBookingById)

module.exports = bookingRouter;