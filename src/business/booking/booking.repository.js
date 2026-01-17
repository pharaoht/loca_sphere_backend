const { EVENT_TYPES } = require("../../events/booking.events");
const BookingModel = require("./booking.model");

class BookingRepository {

    static _returnOrFalse(records) {
        return records && records.length ? records : false;
    }


    static async repoGetGuestBookingsByUserId(userId){

        if(!userId) return false;

        const bookingRecords = await BookingModel.query()
            .where(BookingModel.Fields.GUEST_ID, userId)
    
        return this._returnOrFalse(bookingRecords);
    };

    static async repoGetBookingById(bkId){

        if(!bkId) return false;
        
        const booking = await BookingModel.query()
            .where(BookingModel.Fields.ID, bkId)
            .first()

        if(!booking) return false

        return booking;
    };

    static async repoGetHostBookingsByListingId(listingId, userId){

        if(!listingId || !userId) return false;

        const bookingRecords = await BookingModel.query()
            .where(BookingModel.Fields.HOST_ID, userId)
            .where(BookingModel.Fields.LISTING_ID, listingId)

        return this._returnOrFalse(bookingRecords)
    };

    static async repoGetGuestBookingByListingId(listingId, userId){

        if(!listingId || !userId) return false;

        const bookingRecord = await BookingModel.query()
            .where(BookingModel.Fields.LISTING_ID, listingId)
            .where(BookingModel.Fields.GUEST_ID, userId)
            .findOne();

        return this._returnOrFalse(bookingRecord)
    };

    static async repoCreateBooking(bookingBody = undefined){
 
        if(!bookingBody) return false;

        return await BookingModel.transaction(async trx => {

            const conflicts = await BookingModel.query(trx)
                .where(BookingModel.Fields.LISTING_ID, bookingBody.listingId)   
                .where(BookingModel.Fields.GUEST_ID, bookingBody.guestId) 
                .where(builder => 
                    builder.where(BookingModel.Fields.START_DATE, '<=', bookingBody.endDate)
                    .andWhere(BookingModel.Fields.END_DATE, '>=', bookingBody.startDate)
                )
                .forUpdate().first();

            if(conflicts){
                return false
            }

            try {
                const record = await BookingModel.query(trx).insert(bookingBody);
               
                return record;
            }
            catch (err) {
    
                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    
                    if (err.message.includes(BookingModel.Fields.LISTING_ID)) {
                        throw new Error('Invalid listingId: no such listing exists');
                    }
                    if (err.message.includes(BookingModel.Fields.HOST_ID)) {
                        throw new Error('Invalid hostId: no such user exists');
                    }
                    if (err.message.includes(BookingModel.Fields.GUEST_ID)) {
                        throw new Error('Invalid guestId: no such user exists');
                    }
                }
    
                throw err;
            }
        })

    
    }

    static async repoUpdateBookingStatus(bookingId, status, expectatedStatus){

        if( 
            !status || 
            !bookingId || 
            !expectatedStatus ||
            typeof status !== 'number' ||
            typeof bookingId !== 'string' 
        ) return false;

        const updatedCount = await BookingModel.query()
            .patch({ [BookingModel.Fields.STATUS_ID]: status })
            .where(BookingModel.Fields.ID, bookingId)
            .andWhere(BookingModel.Fields.STATUS_ID, expectatedStatus);

        // If no rows were updated, another process/user likely changed the status
        return updatedCount > 0;
    }

    static async repoDateConflictCheck(listingId = '', requestStartDate, requestEndDate){

        if(!listingId || !requestEndDate || !requestStartDate) return false;
    
        const hasConflict = await BookingModel.query()
            .where(BookingModel.Fields.LISTING_ID, listingId)    
            .where(BookingModel.Fields.STATUS_ID, EVENT_TYPES.BOOKING_STATUS_ID.CONFIRMED)
            .where(builder => 
                builder.where(BookingModel.Fields.START_DATE, '<=', requestEndDate)
                .andWhere(BookingModel.Fields.END_DATE, '>=', requestStartDate)
            ).first();

        return !!hasConflict;
    }

    static async repoGetAvailabityByListingId(listingId = undefined){

        if(!listingId) return false;

        const currentYear = new Date().getUTCFullYear();

        const yearStart = new Date(Date.UTC(currentYear, 0, 1, 0, 0, 0, 0));
 
        const bookings = await BookingModel.query()
            .where(BookingModel.Fields.LISTING_ID, listingId)
            .where(BookingModel.Fields.END_DATE, '>=', yearStart.toISOString())
            .where(BookingModel.Fields.STATUS_ID, 2)


        return bookings;
    }
};

module.exports = BookingRepository;