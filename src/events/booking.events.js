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
};

module.exports = {
    bookingEvents, 
    EVENT_TYPES
}