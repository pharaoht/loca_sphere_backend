const { bookingEvents, EVENT_TYPES } = require('../events/booking.events.js')

// Listen to booking status updates
bookingEvents.on(EVENT_TYPES.BOOKING.STATUS_UPDATED, async ({ bookingId, statusId, hostId, guestId }) => {

    try {
        console.log(`Booking ${bookingId} updated to status ${statusId}`);

        switch (statusId) {

            case EVENT_TYPES.BOOKING_STATUS_ID.PENDING: //pending
                console.log('pending event ran')
                break;
            
            case EVENT_TYPES.BOOKING_STATUS_ID.CONFIRMED: // Confirmed
                console.log('testing: Confirmed Event')
                break;

            case EVENT_TYPES.BOOKING_STATUS_ID.CANCELLED: //cancelled
                break;

            case EVENT_TYPES.BOOKING_STATUS_ID.COMPLETED: //completed
                console.log('complete event ran')
                break;

            case EVENT_TYPES.BOOKING_STATUS_ID.DECLINED: //declined
                console.log('denied event ran')
                // await NotificationService.sendCancellationEmail(guestId, bookingId);
                break;
            
            case EVENT_TYPES.BOOKING_STATUS_ID.CREATED: //created
                console.log('created event ran')
                //notify landlord by email that a new request was created
                //notify the guest by email of their booking
                
                break;

            case EVENT_TYPES.BOOKING_STATUS_ID.ONGOING: //ongoing
                console.log('ongoing event ran')
                break;

            default:
                console.log('No side effects defined for this status.');
        }

    } catch (err) {
        console.error('Error processing booking event:', err);
    }
});
