const EventEmitter = require('events');

const bookingEvents = new EventEmitter();

const EVENT_TYPES = {
    BOOKING: {
        STATUS_UPDATED: 'booking.statusUpdated',
        CREATED: 'booking.created',
        CANCELLED: 'booking.cancelled',
    },
    PAYMENT: {
        STARTED: 'payment.started',
        COMPLETED: 'payment.completed',
        FAILED: 'payment.failed',
    },
    //object being used as an enum
    BOOKING_STATUS_ID: Object.freeze({
        PENDING: 1,
        CONFIRMED: 2,
        CANCELLED: 3,
        COMPLETED: 4,
        DECLINED: 5,
        CREATED: 6,
        ONGOING: 7,
    })
};

module.exports = {
    bookingEvents, 
    EVENT_TYPES
}