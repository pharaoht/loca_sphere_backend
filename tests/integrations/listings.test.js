const request = require('supertest');
const app = require('../../src/app');

describe('GET /api/listing/:listId', () => {
    
    it('should return details when valid id is provided', async () => {
        
    })

    it('should return 404 when no id/invalid id is provided', async () => {

    })

    it('should return 500 when unexpected error happens', async () => {

        jest.spyOn(console, 'error').mockImplementation(() => {});

        const res = await request(app)
            .get('/api/listing/invalid_id')
            .query({ includes: 'address'})
        
        expect(res.statusCode).toBe(500)
    })
});