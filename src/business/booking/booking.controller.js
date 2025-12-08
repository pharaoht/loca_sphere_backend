const Utility = require('../../utility');
const BookingRepository = require("./booking.repository");
const ListingsRepository = require("../listings/listings.repository");
const { bookingEvents, EVENT_TYPES } = require("../../events/booking.events");
const { errorResponse, successResponse } = require('../../responses/responses');

async function httpCreateBooking(req, res){

    try {
        
        const body = req.body;

        const userId = req.user.id;

        if(!body?.listingId || !body?.startDate || !body.endDate) return res.status(400);

        const hasConflict = await BookingRepository.repoDateConflictCheck(body.listingId, body.startDate, body.endDate);

        if(hasConflict) return errorResponse(res, 'Conflicting date times with another booking.', 400);
        
        const hostListing = await ListingsRepository.repoGetListingById(body.listingId)
        
        body.guestId = userId;
        body.hostId = hostListing.userId;

        const success = await BookingRepository.repoCreateBooking(req.body);

        if(!success) return errorResponse(res, 'Could not complete your booking request. You were not charged.', 400)
    
        //emit event
        bookingEvents.emit(EVENT_TYPES.BOOKING.STATUS_UPDATED, 
            { 
                bookingId: success.id,
                statusId: 6,
                hostId: hostListing.userId,
                guestId: userId
            }
        );

        return successResponse(res, null, 'Your booking request was sent to the landlord. You will be charged once its approved', 201)
    } 
    catch (error) {

        console.error(error);

        return res.status(500).json({ error: error.message })
    }
};

async function httpUpdateBookingStatus(req, res){

    try {
        
        const body = req.body;
        const userId = req.user.id;

        const bookingDetails = await BookingRepository.repoGetBookingById(body.bookingId);

        if(bookingDetails.hostId === userId && [2,5].includes(body.statusId)){

            await BookingRepository.repoUpdateBookingStatus(bookingDetails.id, body.statusId)
            //emit event
        }
        else if(bookingDetails.guestId === userId && body.statusId === 3) {

            await BookingRepository.repoUpdateBookingStatus(bookingDetails.id, body.statusId)
            //emit event
        }
        else return errorResponse(res, 'Not authorized', 404, {});

        return successResponse(res, {}, 'booking updated', 200)
    } 
    catch (error) {

        console.error(error);

        return errorResponse(res, error.message, 500, {})
    }
};

async function httpGetBookingById(req, res) {

    try {
        //check the type of id

        //if its a listingId
        //check if user is the owner,

        //if its a userId
        //check if userId is the same
    } 
    catch (error) {
        
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