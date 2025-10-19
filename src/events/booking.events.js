import { EventEmitter } from 'events';

export const bookingEvents = new EventEmitter();

export const EVENT_TYPES = {
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
