const request = require('supertest');
const app = require('../../src/app');
const redis = require('../../src/services/cache/redis.cache')
const database = require('../../src/database/db.connect');

describe('ADDRESS.CONTROLLER GET - /api/address/coordinates', () => {

    afterAll(async () => {
        if (redis && typeof redis.quit === 'function') {
            await redis.quit();
            await database.close();
        }
    });

    it('', () => {})
});

describe('ADDRESS.CONTROLLER GET - /api/address/geocoding', () => {
    
    afterAll(async () => {
        if (redis && typeof redis.quit === 'function') {
            await redis.quit();
            await database.close();
        }
    });

    it('', () => {})
});

describe('ADDRESS.CONTROLLER GET - /api/address/:id', () => {
    
    afterAll(async () => {
        if (redis && typeof redis.quit === 'function') {
            await redis.quit();
            await database.close();
        }
    });

    it('', () => {})
});