const request = require('supertest');
const app = require('../../src/app');
const { TEST_LISTING_ID } = require('../constants/tests.constants');

describe('BOOKING.CONTROLLER GET - /api/bookings/:id', () => {

    it('', () => {})
});

describe('BOOKING.CONTROLLER GET - api/bookings/check-availability/:listingId', () => { 

    const testListingId = TEST_LISTING_ID;
    const invalidTestId = '32e2e2e2e'
    const uri = '/api/bookings/check-availability/'

    let now;
    let future;
    now = new Date(); 
    future = new Date(now);
    future.setDate(now.getDate() + 45);

    it('should return 200 when params are correct without conflicting dates', async () => {

        const moveIn = now.toISOString();


        const res = await request(app)
            .get(`${uri}${testListingId}`)
            .query({ moveIn: moveIn, moveOut: future.toISOString() });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success', true);
    });

    it('should return 400 when incorrect dates are passed', async () => {

        const res = await request(app)
            .get(`${uri}${testListingId}`)
            .query({ moveIn: now, moveOut: ''});

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('success', false);
    
    });

    it('should return 400 when incorrect listingId is passed', async () => {
        
        const moveIn = now.toISOString();

        const res = await request(app)
            .get(`${uri}${invalidTestId}`)
            .query({ moveIn: moveIn, moveOut: future.toISOString() });

        expect(res.statusCode).toBe(404)
        expect(res.body).toHaveProperty('success', false);
    });

    it('should return 409 when dates are conflicting', async () => {

        const res = await request(app)
            .get(`${uri}${invalidTestId}`)
            .query({ moveIn: '2025-11-01T00:00:00Z', moveOut: '2025-11-14T00:00:00Z' });

        expect(res.statusCode).toBe(409)
        expect(res.body).toHaveProperty('success', false);
    });

    it('should return 500 when unexpected error occurs', async () => {

    });
})

describe('BOOKING.CONTROLLER POST - /api/bookings/create', () => {

    it('', () => {})
});

describe('BOOKING.CONTROLLER PATCH - /api/bookings/update-status', () => {

    it('', () => {})
});

describe('BOOKING.CONTROLLER DELETE - /api/bookings/:bkid', () => {

    it('', () => {})
});