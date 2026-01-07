const request = require('supertest');
const app = require('../../src/app');
const RedisCacheService = require('../../src/services/cache/redis.cache');
const ListingsRepository = require('../../src/business/listings/listings.repository')
const listingRepo = require('../../src/business/listings/listings.repository');
const { TEST_LISTING_ID } = require('../constants/tests.constants');

describe('LISTINGS.CONTROLLER GET - /api/listings/:listId', () => {

    const listingId = TEST_LISTING_ID;
    
    it('should return address, currency, and utilityMap when a valid listing ID is provided', async () => {

        const res = await request(app)
            .get(`/api/listings/${listingId}`)
            .query({ includes: 'address,currency,utility' })

        expect(res.body.data).toHaveProperty('address');
        expect(res.body.data).toHaveProperty('currency');
        expect(res.body.data).toHaveProperty('utilityMap');
        expect(res.body.statusCode).toBe(200);
    
    })

    it('should return 404 when no id/invalid id is provided', async () => {
        // jest.spyOn(console, 'error').mockImplementation(() => {});

        const res = await request(app)
            .get('/api/listings/invalid_id')
            .query({ includes: 'address'})
        
        expect(res.body.statusCode).toBe(404)
    })

    it('should return 500 when unexpected error happens', async () => {

        jest.spyOn(listingRepo, 'repoGetListingDeets').mockImplementation(() => {
            throw new Error('Simulated server error');
        });

        const listingId = 'lstlnd006xyz321abc987';

        const res = await request(app)
            .get(`/api/listings/${listingId}`)
            .query({ includes: 'address,currency,utility' })

        expect(res.body.statusCode).toBe(500);
    
    })
});

describe('LISTINGS.CONTROLLER GET - /api/listings/options/:option', () => {

    it('should return 200 when given VALID parameters', async () => {

        const res = await request(app)
            .get(`/api/listings/options/currency`)
        
        expect(res.body.data).toEqual(
            expect.arrayContaining([
                { id: 1, code: 'USD', symbol: '$' },
                { id: 2, code: 'EUR', symbol: '€' },
                { id: 3, code: 'GBP', symbol: '£' },
                { id: 4, code: 'JPY', symbol: '¥' }
            ])
        );

        expect(res.body.statusCode).toBe(200);

    });

    it('should return 404 when given INVALID parameters', async () => {

        const res = await request(app)
            .get('/api/listings/options/cookie')

        expect(res.body.statusCode).toBe(404)
    });

    it('should return 500 when unexpected error occurs', async () => {

        jest.spyOn(RedisCacheService, 'doesExists').mockResolvedValue(false);
        jest.spyOn(RedisCacheService, 'get').mockResolvedValue(null);

        jest.spyOn(ListingsRepository, 'repoGetOptions').mockRejectedValue(
            new Error('Simulated server error')
        );

        const res = await request(app)
            .get('/api/listings/options/currency');

        expect(res.body.statusCode).toBe(500);
    })

});

describe('LISTINGS.CONTROLLER GET - /api/listings/user-id/:userId', () => {

    it('', () => {})
})

describe('LISTINGS.CONTROLLER POST - /api/listings/:stepNum', () => {

    it('', () => {})
});

describe('LISTINGS.CONTROLLER DELETE - /api/listings/:model/:listingId/:id', () => {


    it('', () => {})
})