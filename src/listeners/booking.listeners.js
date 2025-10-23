import { EVENT_TYPES } from '../events/booking.events.js';
import { bookingEvents } from '../events/bookingEvents.js';


// Listen to booking status updates
bookingEvents.on(EVENT_TYPES.BOOKING.STATUS_UPDATED, async ({ bookingId, statusId, hostId, guestId }) => {

    try {
        console.log(`Booking ${bookingId} updated to status ${statusId}`);

        switch (statusId) {

            case 1: //pending
                break;
            
            case 2: // Confirmed
                
                break;

            case 3: //cancelled
                break;

            case 4: //completed
                break;

            case 5: //declined
                // await NotificationService.sendCancellationEmail(guestId, bookingId);
                break;
            
            case 6: //created
                break;

            case 7: //ongoing
                break;

            default:
                console.log('No side effects defined for this status.');
        }

    } catch (err) {
        console.error('Error processing booking event:', err);
    }
});
