import { EVENT_TYPES } from '../events/booking.events.js';
import { bookingEvents } from '../events/bookingEvents.js';


// Listen to booking status updates
bookingEvents.on(EVENT_TYPES.BOOKING.STATUS_UPDATED, async ({ bookingId, statusId, hostId, guestId }) => {

    try {
        console.log(`Booking ${bookingId} updated to status ${statusId}`);

        switch (statusId) {

            case EVENT_TYPES.BOOKING_STATUS_ID.PENDING: //pending
                break;
            
            case EVENT_TYPES.BOOKING_STATUS_ID.CONFIRMED: // Confirmed
                
                break;

            case EVENT_TYPES.BOOKING_STATUS_ID.CANCELLED: //cancelled
                break;

            case EVENT_TYPES.BOOKING_STATUS_ID.COMPLETED: //completed
                break;

            case EVENT_TYPES.BOOKING_STATUS_ID.DECLINED: //declined
                // await NotificationService.sendCancellationEmail(guestId, bookingId);
                break;
            
            case EVENT_TYPES.BOOKING_STATUS_ID.CREATED: //created
                //notify landlord by email that a new request was created
                //notify the guest by email of their booking
                
                break;

            case EVENT_TYPES.BOOKING_STATUS_ID.ONGOING: //ongoing
                break;

            default:
                console.log('No side effects defined for this status.');
        }

    } catch (err) {
        console.error('Error processing booking event:', err);
    }
});
