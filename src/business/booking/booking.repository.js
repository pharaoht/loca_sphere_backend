const BookingModel = require("./booking.model");

class BookingRepository {

    static async repoGetBookingById(id){

        if(!id || typeof id !== 'string') return false;

        let column;

        if(id.startsWith('bk')) column = BookingModel.Fields.ID;
        else if(id.startsWith('ls')) column = BookingModel.Fields.LISTING_ID;
        // else if(id.startsWith('us')) column = BookingModel.Fields.HOSTID;
        else return false;

        const record = await BookingModel.query().findOne({ [column]: id});

        return record;

    };

    static async repoCreateBooking(bookingBody){
 
        if(!bookingBody) return false;
    
        const record = await BookingModel.query().insert(bookingBody);
       
        return record;
    }

    static async repoUpdateBookingStatus(bookingId, status){

        if(!bookingId || typeof bookingId !== 'string' || !status || typeof status !== 'number') return false;

        const updatedRecord = await BookingModel.query()
            .patch({ [BookingModel.Fields.STATUS_ID]: status })
            .where(BookingModel.Fields.ID, bookingId)

        return updatedRecord
    }

    static async repoDateConflictCheck(listingId = '', requestStartDate, requestEndDate){

        if(!listingId || !requestEndDate || !requestStartDate) return false;
    
        const hasConflict = await BookingModel.query()
            .where(BookingModel.Fields.LISTING_ID, listingId)    
            .where(builder => 
                builder.where(BookingModel.Fields.START_DATE, '<=', requestEndDate)
                .andWhere(BookingModel.Fields.END_DATE, '>=', requestStartDate)
            ).first();

        return !!hasConflict;
    }

    static async repoGetAvailabityByListingId(listingId = undefined){

        if(!listingId) return false;

        const currentYear = new Date().getUTCFullYear();

        const yearStart = new Date(currentYear, 0, 1);
 
        const bookings = await BookingModel.query()
        .where(BookingModel.Fields.LISTING_ID, listingId)
        .where(BookingModel.Fields.START_DATE, '>=', yearStart.toISOString())

        return bookings;
    }
};

module.exports = BookingRepository;