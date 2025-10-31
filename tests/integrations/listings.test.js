const request = require('supertest');
const app = require('../../src/app');
const redis = require('../../src/services/cache/redis.cache')
const database = require('../../src/database/db.connect');

describe('GET /api/listing/:listId', () => {

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
            .query({ includes: 'address' })


        console.log('Response:', JSON.stringify(res.body, null, 2));

        expect(res.statusCode).toBe(404);
    
    })

    it('should return 404 when no id/invalid id is provided', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});

        const res = await request(app)
            .get('/api/listing/invalid_id')
            .query({ includes: 'address'})
        
        expect(res.statusCode).toBe(404)
    })

    it('should return 500 when unexpected error happens', async () => {


    })
});

describe('GET /api/listing/options/:option', () => {

    afterAll(async () => {
        if (redis && typeof redis.quit === 'function') {
            await redis.quit();
            await database.close();
        }
    });

    it('should return 200 when given valid parameters', () => {

    });


});

describe('GET /api/listing/user-id/:userId', () => {

    afterAll(async () => {
        if (redis && typeof redis.quit === 'function') {
            await redis.quit();
            await database.close();
        }
    });

    it('', () => {})
})

describe('POST /api/listing/:stepNum', () => {

    afterAll(async () => {
        if (redis && typeof redis.quit === 'function') {
            await redis.quit();
            await database.close();
        }
    });

    it('', () => {})
});

describe('DELETE /api/listing/:model/:listingId/:id', () => {

    afterAll(async () => {
        if (redis && typeof redis.quit === 'function') {
            await redis.quit();
            await database.close();
        }
    });

    it('', () => {})
})