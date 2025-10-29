const BookingRepository = require("./booking.repository");
const ListingsRepository = require("../listings/listings.repository");
const { bookingEvents, EVENT_TYPES } = require("../../events/booking.events");

async function httpCreateBooking(req, res){

    try {
        
        const body = req.body;

        const userId = req.user.id;

        if(!body?.listingId || !body?.startDate || !body.endDate) return res.status(400);

        const hasConflict = await BookingRepository.repoDateConflictCheck(body.listingId, body.startDate, body.endDate);

        if(hasConflict) return res.status(400).json({ message: 'conflicting date times' })
        
        const hostListing = await ListingsRepository.repoGetListingById(body.listingId)
        
        body.guestId = userId;
        body.hostId = hostListing.userId;

        const success = await BookingRepository.repoCreateBooking(req.body);

        if(!success){
            return res.status(400)
        }

        //emit event
        bookingEvents.emit(EVENT_TYPES.BOOKING.STATUS_UPDATED, 
            { 
                bookingId: success.id,
                statusId: 6,
                hostId: hostListing.userId,
                guestId: userId
            }
        );

        return res.status(200).json({message: 'created'})

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
        else return res.status(404).json({ message: 'No authorized'})

        return res.status(200).json({ message: 'Status updated'})

    } 
    catch (error) {

        console.error(error);

        return res.status(500).json({ error: error.message })
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

module.exports = {
    httpCreateBooking,
    httpUpdateBookingStatus,
    httpGetBookingById,
    httpDeleteBookingById
}