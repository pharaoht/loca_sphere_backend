const request = require('supertest');
const app = require('../../src/app');
const moment = require('moment');
const { TEST_LISTING_ID } = require('../constants/tests.constants');

describe('BOOKING.CONTROLLER GET - /api/bookings/:id', () => {

    it('', () => {})
});

describe('BOOKING.CONTROLLER GET - api/bookings/check-availability/:listingId', () => { 

    const testListingId = TEST_LISTING_ID;
    const invalidTestId = '32e2e2e2e'
    const uri = '/api/bookings/check-availability/'

    it('should return 200 when params are correct without conflicting dates', async () => {

        const moveIn = moment(new Date()).add(22, 'day').format('YYYY-MM-DD');
        const moveOut = moment(new Date()).add(54, 'day').format('YYYY-MM-DD');

        const res = await request(app)
            .get(`${uri}${testListingId}`)
            .query({ moveIn, moveOut });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success', true);

    });

    it('should return 400 when incorrect listingId is passed', async () => {

        const res = await request(app)
            .get(`${uri}${invalidTestId}`)
            .query({ moveIn: '2025-11-01', moveOut: '' });

        expect(res.statusCode).toBe(404)
        expect(res.body).toHaveProperty('success', false);
    });

    it('should return 409 when dates are conflicting', async () => {

        const moveIn = moment(new Date()).add(1, 'day').format('YYYY-MM-DD');
        const moveOut = moment(new Date()).add(11, 'day').format('YYYY-MM-DD');

        const res = await request(app)
            .get(`${uri}${testListingId}`)
            .query({ moveIn, moveOut });

        expect(res.statusCode).toBe(409)
        expect(res.body).toHaveProperty('success', false);
    });

    it('should return 500 when unexpected error occurs', async () => {

    });
})

describe('BOOKING.CONTROLLER POST - /api/bookings/create', () => {

    it('should return 400 when params "listingId", "startDate", "endDate" are undefined', () => {});

    it('should return 400 when params "startDate" and "endDate" are not valid', () => {});

    it('should return 400 when param "endDate" is before param "startDate', () => {});

    it('should return 400 when params are conflicting with existing bookings', () => {});

    it('should return 400 when hostId is the same as guestId', () => {});

    it('should return 400 when profile is not complete', () => {});

    it('should return 400 when booking could not be completed', () => {});

    it('should return 200 when booking passes all validity checks', () => {});

});

describe('BOOKING.CONTROLLER PATCH - /api/bookings/update-status', () => {

    it('', () => {})
});

describe('BOOKING.CONTROLLER DELETE - /api/bookings/:bkid', () => {

    it('', () => {})
});