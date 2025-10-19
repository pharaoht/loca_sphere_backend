import { bookingEvents } from '../events/bookingEvents.js';


// Listen to booking status updates
bookingEvents.on('booking:statusUpdated', async ({ bookingId, statusId, hostId, guestId }) => {

    try {
        console.log(`Booking ${bookingId} updated to status ${statusId}`);

        switch (statusId) {
            // case 2: // Confirmed
            //     await PaymentService.startPayment(bookingId);
            //     await NotificationService.sendConfirmationEmail(guestId, bookingId);
            //     await NotificationService.sendTextMessage(guestId, 'Your booking is confirmed!');
            //     break;

            // case 5: // Cancelled
            //     await NotificationService.sendCancellationEmail(guestId, bookingId);
            //     break;

            // default:
            //     console.log('No side effects defined for this status.');
        }

    } catch (err) {
        console.error('Error processing booking event:', err);
    }
});
