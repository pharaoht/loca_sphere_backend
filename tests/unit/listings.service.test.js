const ListingService = require('../../src/business/listings/listings.service');
const moment = require('moment');
const BookingRepository = require('../../src/business/booking/booking.repository');
const ListingsModel = require('../../src/business/listings/listings.model');
const BookingModel = require('../../src/business/booking/booking.model');

describe('Unit Test: _computeNextAvailableDateForListing function', () => {

    let repoStub;

    beforeEach(() => {
        // Mock the Repository method to prevent actual DB hits
        repoStub = jest.spyOn(BookingRepository, 'repoGetRelevantBookingsByListingIds');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
    
    it('should return an empty array if inputs are invalid or empty', async () => {
        const resultNull = await ListingService._computeNextAvailableDateForMultipleListings(null);
        const resultEmpty = await ListingService._computeNextAvailableDateForMultipleListings([]);

        expect(resultNull).toEqual([]);
        expect(resultEmpty).toEqual([]);
        expect(repoStub).not.toHaveBeenCalled();
    });

    it('should set nextAvailableDate to tomorrow if a listing has no bookings', async () => {
        const mockListings = [
            {
                listing: {
                    [ListingsModel.Fields.ID]: 'list_001',
                    [ListingsModel.Fields.MINIMUM_STAY_DAYS]: 3
                }
            }
        ];

        // DB returns no bookings for this listing ID
        repoStub.mockResolvedValue([]);

        const result = await ListingService._computeNextAvailableDateForMultipleListings(mockListings);
        
        const expectedDate = moment().startOf('day').add(1, 'days');
        
        // Assertions
        expect(result[0].listing._nextAvailableDate.isSame(expectedDate, 'day')).toBe(true);
    });

    it('should find an early gap if the gap between bookings satisfies the minimum stay requirement', async () => {
        const mockListings = [
            {
                listing: {
                    [ListingsModel.Fields.ID]: 'list_002',
                    [ListingsModel.Fields.MINIMUM_STAY_DAYS]: 2
                }
            }
        ];

        const mockBookings = [
            {
                [BookingModel.Fields.LISTING_ID]: 'list_002',
                [BookingModel.Fields.START_DATE]: '2026-07-01',
                [BookingModel.Fields.END_DATE]: '2026-07-05'
            },
            {
                // 3-day gap here (6th, 7th, 8th), which satisfies the minimum stay of 2
                [BookingModel.Fields.LISTING_ID]: 'list_002',
                [BookingModel.Fields.START_DATE]: '2026-07-09',
                [BookingModel.Fields.END_DATE]: '2026-07-15'
            }
        ];

        repoStub.mockResolvedValue(mockBookings);

        const result = await ListingService._computeNextAvailableDateForMultipleListings(mockListings);
        
        // Should return July 6th (1 day after the first booking ends)
        const expectedDate = moment('2026-07-05').startOf('day').add(1, 'days');
        expect(result[0].listing._nextAvailableDate.isSame(expectedDate, 'day')).toBe(true);
    });

    it('should skip an early gap if it does not satisfy the minimum stay requirement and fallback to the end of the last booking', async () => {
        const mockListings = [
            {
                listing: {
                    [ListingsModel.Fields.ID]: 'list_003',
                    [ListingsModel.Fields.MINIMUM_STAY_DAYS]: 5
                }
            }
        ];

        const mockBookings = [
            {
                [BookingModel.Fields.LISTING_ID]: 'list_003',
                [BookingModel.Fields.START_DATE]: '2026-07-01',
                [BookingModel.Fields.END_DATE]: '2026-07-05'
            },
            {
                // Only a 2-day gap here (6th, 7th). Minimum stay is 5 days, so this gap is useless.
                [BookingModel.Fields.LISTING_ID]: 'list_003',
                [BookingModel.Fields.START_DATE]: '2026-07-08',
                [BookingModel.Fields.END_DATE]: '2026-07-15'
            }
        ];

        repoStub.mockResolvedValue(mockBookings);

        const result = await ListingService._computeNextAvailableDateForMultipleListings(mockListings);
        
        // Should bypass the first gap and pick the day after the final booking ends (July 16th)
        const expectedDate = moment('2026-07-15').startOf('day').add(1, 'days');
        expect(result[0].listing._nextAvailableDate.isSame(expectedDate, 'day')).toBe(true);
    });

    it('should correctly process multiple independent listings simultaneously', async () => {
        const mockListings = [
            { listing: { [ListingsModel.Fields.ID]: 'list_A', [ListingsModel.Fields.MINIMUM_STAY_DAYS]: 2 } },
            { listing: { [ListingsModel.Fields.ID]: 'list_B', [ListingsModel.Fields.MINIMUM_STAY_DAYS]: 2 } }
        ];

        const mockBookings = [
            { [BookingModel.Fields.LISTING_ID]: 'list_A', [BookingModel.Fields.START_DATE]: '2026-07-01', [BookingModel.Fields.END_DATE]: '2026-07-05' }
            // list_B left deliberately with no bookings
        ];

        repoStub.mockResolvedValue(mockBookings);

        const result = await ListingService._computeNextAvailableDateForMultipleListings(mockListings);

        const expectedDateA = moment('2026-07-05').startOf('day').add(1, 'days');
        const expectedDateB = moment().startOf('day').add(1, 'days');

        // Check list_A resolved via its single booking rules
        expect(result[0].listing._nextAvailableDate.isSame(expectedDateA, 'day')).toBe(true);
        // Check list_B resolved via its fallback "no bookings" loop route
        expect(result[1].listing._nextAvailableDate.isSame(expectedDateB, 'day')).toBe(true);
    });
});