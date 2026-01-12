const request = require('supertest');
const app = require('../../src/app');
const moment = require('moment');
const { TEST_LISTING_ID, TEST_USER_GUEST_ID, TEST_USER_HOST_ID, TEST_BOOKING_ID } = require('../constants/tests.constants');
const { generateTestToken } = require('../helpers/helpers');

const hostId = generateTestToken(TEST_USER_HOST_ID);
const guestId = generateTestToken(TEST_USER_GUEST_ID);

describe('BOOKING.CONTROLLER GET - /api/bookings/:id', () => {

    it('should return 404 when user doesnt have a booking and both params are null', () => {})

    it('should return 200 when user has a booking and both params are null', () => {});
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

    it('should return 400 when payment is not complete', () => {});

    it('should return 400 when profile is not complete', () => {});

    it('should return 400 when booking could not be completed', () => {});

    it('should return 200 when booking passes all validity checks', () => {});

});

describe('BOOKING.CONTROLLER PATCH - /api/bookings/update-status', () => {

    const url = '/api/bookings/update-status';

    it('should return 400 when bookingId or statusChangeId is missing', async () => {

        const res = await request(app)
            .patch(url)
            .set('Authorization', `Bearer ${hostId}`)
            .send({ bookingId: null, statusChangeId: null });

        expect(res.statusCode).toBe(400)
    });

    it('should return 400 when statusChangeId is invalid', async () => {

        const res = await request(app)
            .patch(url)
            .set('Authorization', `Bearer ${hostId}`)
            .send({ bookingId: TEST_BOOKING_ID, statusChangeId: 9 });

        expect(res.statusCode).toBe(400)
    });

    it('should return 404 when booking does not exist', async () => {

        const res = await request(app)
            .patch(url)
            .set('Authorization', `Bearer ${hostId}`)
            .send({ bookingId: '123234567', statusChangeId: 1 });

        expect(res.statusCode).toBe(404)
    });

    it('should return 403 when user is not authorized to update booking', async () => {

        const res = await request(app)
            .patch(url)
            .set('Authorization', `Bearer ${hostId}`)
            .send({ bookingId: TEST_BOOKING_ID, statusChangeId: 1 });

        console.log(res.body)
        expect(res.statusCode).toBe(403)
    });

    it('should return 400 if trying to confirm booking with conflicting dates', async () => {

    });

    it('should successfully update booking status for authorized user', async () => {
        // TODO: call PATCH as host on a booking that can be confirmed
        // expect status 200 and correct response message
        // optionally, check DB that statusId changed
    });

    // ================================
    // Placeholders for event tests
    // ================================
    it('should emit STATUS_UPDATED event on successful booking update', async () => {
        // TODO: listen for event and verify emitted payload
    });

    it('should trigger side effects for CONFIRMED status', async () => {
        // TODO: test that bookingEvents listener side effects would run
    });

    it('should trigger side effects for DECLINED status', async () => {
        // TODO: test that bookingEvents listener side effects would run
    });

});

describe('BOOKING.CONTROLLER DELETE - /api/bookings/:bkid', () => {

    it('', () => {})
});