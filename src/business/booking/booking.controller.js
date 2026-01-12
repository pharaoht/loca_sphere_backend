const Utility = require('../../utility');
const BookingService = require('./booking.service');
const BookingRepository = require("./booking.repository");
const UserRepository = require('../users/users.repository');
const ListingsRepository = require("../listings/listings.repository");
const { bookingEvents, EVENT_TYPES } = require("../../events/booking.events");
const { errorResponse, successResponse } = require('../../responses/responses');
const BookingModel = require('./booking.model');
const ListingsModel = require('../listings/listings.model');

async function httpCreateBooking(req, res){

    try {

        const body = req.body;
        const userId = req.user.id;
        const bookingStatus = EVENT_TYPES.BOOKING_STATUS_ID.CREATED;

        if(!body?.listingId || !body?.startDate || !body?.endDate) return errorResponse(res, 'Unable to process request: Require fields were not provided', 400);

        const sanitizeStartDate = BookingService.dateStringToIsoFormat(body.startDate);
        const santizeEndDate = BookingService.dateStringToIsoFormat(body.endDate);

        if(!sanitizeStartDate || !santizeEndDate) return errorResponse(res, 'startDate and endDate are not valid params: yyyy-mm-dd or yyyy/mm/dd are accepted', 400)

        const isEndDateGreaterThanStartDate = BookingService.isEndDateGreaterThanStartDate(sanitizeStartDate, santizeEndDate);

        if(!isEndDateGreaterThanStartDate) return errorResponse(res, 'Desired check-out date is before check-in date', 400);

        const hasConflict = await BookingRepository.repoDateConflictCheck(body.listingId, sanitizeStartDate, santizeEndDate);

        if(hasConflict) return errorResponse(res, 'Conflicting date times with another booking.', 400);

        //add check if the requested booking is a potential duplicate from user with the exact same dates

        const hostListing = await ListingsRepository.repoGetListingById(body.listingId);

        if(userId === hostListing?.userId) return errorResponse(res, 'Hosts cannot book their own listings.', 400);

        body.guestId = userId;
        body.hostId = hostListing.userId;
        body.startDate = sanitizeStartDate;
        body.endDate = santizeEndDate;
        body.statusId = bookingStatus;
        body.guests = +body.guests;
        delete body.updateViaEmail;
        delete body.updateViaText;

        //check if payment details are complete
        const isPaymentComplete = false;
        //check if personal details are complete
        const isProfileComplete = await UserRepository.repoIsUserProfileComplete(userId);

        if(!isProfileComplete) return errorResponse(res, 'Your personal details arent complete. Please complete to request booking', 400);

        const success = await BookingRepository.repoCreateBooking(body);

        if(!success) return errorResponse(res, 'Could not complete your booking request. You were not charged.', 400);
    
        //emit event
        bookingEvents.emit(
            EVENT_TYPES.BOOKING.STATUS_UPDATED, 
            { 
                bookingId: success.id,
                statusId: bookingStatus,
                hostId: hostListing.userId,
                guestId: userId
            }
        );

        return successResponse(res, success, 'Your booking request was sent to the landlord. You will be charged once its approved', 201);

    } 
    catch (error) {

        console.error(error);

        return errorResponse(res, 'internal server error', 500);
    }
};

async function httpUpdateBookingStatus(req, res){

    try {

        const { bookingId, statusChangeId } = req.body;

        if(!bookingId || !statusChangeId) return errorResponse(res, 'booking id or status id was not provided', 400);

        const statusChangeIdNum = Number(statusChangeId);

        if(Number.isNaN(statusChangeIdNum)) return errorResponse(res, 'Not a valid status id', 400);

        const userId = req.user.id;

        const isValidStatus = Object.values(EVENT_TYPES.BOOKING_STATUS_ID).includes(statusChangeIdNum);

        if(!isValidStatus) return errorResponse(res, 'Not a valid action', 400);
        
        const bookingRecord = await BookingRepository.repoGetBookingById(bookingId);
        console.log(bookingRecord)
        if(!bookingRecord) return errorResponse(res, 'Unable to find that booking record', 404);

        const currentBookingStatusId = bookingRecord[BookingModel.Fields.STATUS_ID];

        const finalizedStatuses = {
            [EVENT_TYPES.BOOKING_STATUS_ID.COMPLETED]: 'Booking is complete, cannot update',
            [EVENT_TYPES.BOOKING_STATUS_ID.DECLINED]: 'Booking has been denied, cannot update',
            [EVENT_TYPES.BOOKING_STATUS_ID.CANCELLED]: 'Booking has been cancelled, cannot update.',
        };

        if (finalizedStatuses[currentBookingStatusId]) {
            return errorResponse(res, finalizedStatuses[currentBookingStatusId], 400);
        }

        if(
            userId === bookingRecord[BookingModel.Fields.HOST_ID] && 
            statusChangeIdNum === EVENT_TYPES.BOOKING_STATUS_ID.CONFIRMED
        ){
            const sd = bookingRecord[BookingModel.Fields.START_DATE];
            const ed = bookingRecord[BookingModel.Fields.END_DATE];
            const listId = bookingRecord[BookingModel.Fields.LISTING_ID];

            const hasConflict = await BookingRepository.repoDateConflictCheck(listId, sd, ed);

            if(hasConflict) return errorResponse(res, 'Conflicting date times with another booking.', 400);

        }

        const bookingStatusPolicy = BookingService.createBookingStatusPolicy({
            userId: userId,
            bookingStatusId: statusChangeIdNum,
            bookingEventTypes: EVENT_TYPES,
            bookingRecord: bookingRecord,
            bookingEventObj: bookingEvents
        });

        if(!bookingStatusPolicy.isAuthorized) return errorResponse(res, 'You are not authorize to make this change', 403);

        const wasAbleToUpdate = await BookingRepository.repoUpdateBookingStatus(bookingId, statusChangeIdNum, currentBookingStatusId);

        if(!wasAbleToUpdate) return errorResponse(res, 'Unable to update booking status, try again later', 400);

        bookingStatusPolicy.emitBookingStatusUpdateEvent();

        return successResponse(res, {}, 'booking updated successfully', 200);
        
    }
    catch (error) {

        console.error(error);

        return errorResponse(res, 'internal server error', 500);
    }

};

async function httpGetBookingById(req, res) {

    //queries
    //bookingId
    //listingId
    //to think about
    //limit, page, statusId, 

    const notFound = (message) => errorResponse(res, message, 404, {});
    const unauthorized = (message) => errorResponse(res, message, 403, {});
    
    try {
        //“If the request can only ever mean one thing, handle it immediately.”
        const userId = req.user.id;
        const { bookingId, listingId } = req.query;

        if(!bookingId && !listingId){

            const data = await BookingRepository.repoGetGuestBookingsByUserId(userId);

            if(!data) return notFound('could not find a booking.');

            return successResponse(res, data, 'success', 200);
        }

        else if(bookingId){

            const bookingRecord = await BookingRepository.repoGetBookingById(bookingId);

            const isGuest = bookingRecord[BookingModel.Fields.GUEST_ID] === userId;
            const isHost = bookingRecord[BookingModel.Fields.HOST_ID] === userId;

            if(!isGuest && !isHost) return unauthorized('unauthorized');
            
            return successResponse(res, bookingRecord, 'success', 200);
        }

        else if (listingId){
            
            const listing = await ListingsRepository.repoGetListingById(listingId);

            if(!listing) return notFound('no listing found.');
    
            const isHost = listing[ListingsModel.Fields.USER_ID] === userId;
            
            if(isHost){

                const records = await BookingRepository.repoGetHostBookingsByListingId(listingId, userId);

                if(!records) return notFound('currently no bookings for that listing');

                return successResponse(res, records, 'success', 200);
            }
            else {

                const record = await BookingRepository.repoGetGuestBookingByListingId(listingId, userId);

                if(!record) return notFound('you havent booked this yet');

                return successResponse(res, record, 'you have a booking.', 200);
            }
        }
        else return notFound('nothing here.');

    } 
    catch (error) {

        console.error(error);
        return errorResponse(res, 'Server error', 500, {});
    }
}

async function httpDeleteBookingById(req, res){
    
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function httpCheckAvailability(req, res){

    try {

        const { listingId } = req.params;
        const { moveIn, moveOut } = req.query;

        const listing = await ListingsRepository.repoGetListingById(listingId);

        if(!listing) return res.status(404).json({ success: false, message: 'No listing by that Id' })

        if(!Utility.dateValidation(moveIn, moveOut)){

            console.error('Invalid dates')

            return res.status(400).json({ success: false, message: 'Bad request, Dates are in the past or not valid' })
        }

        const isConflict = await BookingRepository.repoDateConflictCheck(listingId, moveIn, moveOut);

        if(isConflict){

            console.warn('Date requested has conflicting times');

            return res.status(409).json({ success: false, message: 'The request could not be completed due to a conflict with the current state of the target resource.'})
        }

        return res.status(200).json({ success: true, message: 'No conflict' });
    }
    catch(error){
        
        console.error(error);

        return res.status(500).json({ success: false, error: error || 'Internal server error' });
    }
}

async function httpGetAvailabilityForListing(req, res, next) {
    
    try {

        //listid param
        const { listingId } = req.params;

        const results = await BookingRepository.repoGetAvailabityByListingId(listingId);

        if(!results) return errorResponse(res, 'ListingId was not received', 400, {});

        return successResponse(res, results, 'success', 200);
    }
    catch(error){

        console.error(error);

        return errorResponse(res, 'Internal server error', 500, {})
    }
}

module.exports = {
    httpCreateBooking,
    httpUpdateBookingStatus,
    httpGetBookingById,
    httpDeleteBookingById,
    httpCheckAvailability,
    httpGetAvailabilityForListing
}



// You run a scheduler (cron-like) that periodically:

// Finds bookings where:

// now >= startDate AND status is confirmed → mark as ongoing

// now >= endDate AND status is ongoing → mark as completed

// Updates status

// Triggers email notifications

// This job:

// Runs every minute / 5 minutes / hour (depending on precision)

// Calls domain logic, NOT your HTTP route


//Think abouts for Once host confirms one booking
// action: host confirms a booking statusId 2 (confirmed)
// effect: all other bookings with statusId 1 (pending) should be turned to statusId 5 (declined)
// (we should also check what bookings are in conflict with the one accepted, then keep the rest pending)
// ( should we use web sockets to return the most up to date bookings? )
// ( in the updateBooking controller we need to add logic preventing accepting a booking in conflict with another )
// ( we already have a onConflict method in our booking Repository. Bookings have start date and end date on them, so itll be straight forward to implement)
// ( but guests and host will be using this endpoint, we should only check if the user is host and requestedStatusId is 2)
// then: email users with effected bookings that their request was declined and not charged
// if user who's booking was accepted has other pending bookings, then set those status to 3 (CANCELLED)
// where should be put this logic?
// -> what we know: when a booking is updated a event is emitted, can we just put the logic for it in the listening switch statement?


//“When a request shape has only one valid business interpretation, handle it directly; otherwise, resolve intent by validating the user’s relationship to the referenced resource.”