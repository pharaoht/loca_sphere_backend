const request = require('supertest');
const app = require('../../src/app');
const redis = require('../../src/services/cache/redis.cache')
const database = require('../../src/database/db.connect');
const listingRepo = require('../../src/business/listings/listings.repository');
const { TEST_LISTING_ID } = require('../constants/tests.constants');

describe('LISTINGS.CONTROLLER GET - /api/listings/:listId', () => {

    const listingId = TEST_LISTING_ID;
    
    it('should return address, currency, and utilityMap when a valid listing ID is provided', async () => {

        const res = await request(app)
            .get(`/api/listings/${listingId}`)
            .query({ includes: 'address,currency,utility' })

        expect(res.body).toHaveProperty('address');
        expect(res.body).toHaveProperty('currency');
        expect(res.body).toHaveProperty('utilityMap');
        expect(res.statusCode).toBe(200);
    
    })

    it('should return 404 when no id/invalid id is provided', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});

        const res = await request(app)
            .get('/api/listing/invalid_id')
            .query({ includes: 'address'})
        
        expect(res.statusCode).toBe(404)
    })

    it('should return 500 when unexpected error happens', async () => {

        jest.spyOn(listingRepo, 'repoGetListingDeets').mockImplementation(() => {
            throw new Error('Simulated server error');
        });

        const listingId = 'lstlnd006xyz321abc987';

        const res = await request(app)
            .get(`/api/listings/${listingId}`)
            .query({ includes: 'address,currency,utility' })

        expect(res.statusCode).toBe(500);
    
    })
});

describe('LISTINGS.CONTROLLER GET - /api/listings/options/:option', () => {

    beforeAll(async () => {
        await database.connect();   // <--- make sure knex is ready
        await redis.connect?.();    // optional if redis has connect()
    });

    it('should return 200 when given VALID parameters', async () => {

        const res = await request(app)
            .get(`/api/listings/options/currency`)
        
        expect(res.body).toEqual(
            expect.arrayContaining([
                { id: 1, code: 'USD', symbol: '$' },
                { id: 2, code: 'EUR', symbol: '€' },
                { id: 3, code: 'GBP', symbol: '£' },
                { id: 4, code: 'JPY', symbol: '¥' }
            ])
        );

        expect(res.status).toBe(200);

    });

    it('should return 404 when given INVALID parameters', async () => {

        const res = await request(app)
            .get('/api/listings/options/cookie')

        expect(res.status).toBe(404)
    });

    it('should return 500 when unexpected error occurs', async () => {

        jest.spyOn(listingRepo, 'repoGetOptions').mockImplementation(() => {
            throw new Error('Simulated server error');
        });

        const res = await request(app)
            .get(`/api/listings/options/currency`)

        expect(res.statusCode).toBe(500);
    })

});

describe('LISTINGS.CONTROLLER GET - /api/listings/user-id/:userId', () => {

    beforeAll(async () => {
        await database.connect();
        await redis.connect?.();   
    });

    it('', () => {})
})

describe('LISTINGS.CONTROLLER POST - /api/listings/:stepNum', () => {

    beforeAll(async () => {
        await database.connect(); 
        await redis.connect?.();    
    });

    it('', () => {})
});

describe('LISTINGS.CONTROLLER DELETE - /api/listings/:model/:listingId/:id', () => {

    beforeAll(async () => {
        await database.connect(); 
        await redis.connect?.();    
    });


    it('', () => {})
})