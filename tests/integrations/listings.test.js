const request = require('supertest');
const app = require('../../src/app');
const redis = require('../../src/services/cache/redis.cache')
const database = require('../../src/database/db.connect');
const listingRepo = require('../../src/business/listings/listings.repository');

describe('LISTINGS.CONTROLLER GET - /api/listing/:listId', () => {

    beforeAll(async () => {
        await database.connect();   // <--- make sure knex is ready
        await redis.connect?.();    // optional if redis has connect()
    });

    afterAll(async () => {
        if (redis && typeof redis.quit === 'function') {
            await redis.quit();
            await database.close();
        }
    });
    
    it('should return details when valid id is provided', async () => {
        
        const listingId = 'lstlnd006xyz321abc987';

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

describe('LISTINGS.CONTROLLER GET - /api/listing/options/:option', () => {

    beforeAll(async () => {
        await database.connect();   // <--- make sure knex is ready
        await redis.connect?.();    // optional if redis has connect()
    });

    afterAll(async () => {
        if (redis && typeof redis.quit === 'function') {
            await redis.quit();
            await database.close();
        }
    });

    it('should return 200 when given valid parameters', () => {

    });


});

describe('LISTINGS.CONTROLLER GET - /api/listing/user-id/:userId', () => {

    beforeAll(async () => {
        await database.connect();
        await redis.connect?.();   
    });

    afterAll(async () => {
        if (redis && typeof redis.quit === 'function') {
            await redis.quit();
            await database.close();
        }
    });

    it('', () => {})
})

describe('LISTINGS.CONTROLLER POST - /api/listing/:stepNum', () => {

    beforeAll(async () => {
        await database.connect(); 
        await redis.connect?.();    
    });

    afterAll(async () => {
        if (redis && typeof redis.quit === 'function') {
            await redis.quit();
            await database.close();
        }
    });

    it('', () => {})
});

describe('LISTINGS.CONTROLLER DELETE - /api/listing/:model/:listingId/:id', () => {

    beforeAll(async () => {
        await database.connect(); 
        await redis.connect?.();    
    });

    afterAll(async () => {
        if (redis && typeof redis.quit === 'function') {
            await redis.quit();
            await database.close();
        }
    });

    it('', () => {})
})