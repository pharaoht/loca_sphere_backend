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