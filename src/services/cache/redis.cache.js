const redis = require('redis');

require('dotenv').config();

const ENVIRONMENT = process.env.NODE_ENV;
const DOMAIN = process.env.REDIS_URL;
const LOCALDOMAIN = 'redis://localhost:6379';

class RedisCacheService {

    constructor() {
        if (!RedisCacheService.instance) {
            this.redisClient = redis.createClient({
                url: process.env.REDIS_URL || 'redis://localhost:6379',
                socket: {
                reconnectStrategy: (retries) => {
                    if (retries > 5) return new Error('Too many retries.');
                    return retries * 500;
                },
                },
            });

            this.isConnected = false;

            this.redisClient.on('error', (err) => {
                this.isConnected = false;
                console.error('Redis client error:', err);
            });

            this.redisClient.on('end', () => console.log('Redis connection closed'));

            RedisCacheService.instance = this;
        }
        return RedisCacheService.instance;
    }

    
    async connect() {
        if (!this.isConnected) {
            await this.redisClient.connect();
            this.isConnected = true;
            console.log('*** redis instance created ***');
        }
    }


    async quit() {
        if (this.isConnected) {
            await this.redisClient.quit();
            this.isConnected = false;
            console.log('🧹 Redis connection closed');
        }
    }

    async get(key){

        try {

            const cacheResult = await this.redisClient.get(key);

            return cacheResult ? JSON.parse(cacheResult) : null;
        }
        catch(error){

            console.error('Error while getting key in redis:', error)
        }
    };

    async set(key, value, options = {}){

        try {

            await this.redisClient.set(key, JSON.stringify(value), options)
        }
        catch(error){

            console.error('Error while setting key/value in redis:', error)
        };
    };

    async generateCacheKey(base, params){

        const str = Object.entries(params)
            .filter(([key, value]) => value !== undefined)
                .map(([key, value]) => `:${key}${value}`)
                    .join('');

        return base + str;
    };

    async clearAllCluster() {

        try {
    
            await this.redisClient.flushAll();

            console.log('All keys in the cluster have been cleared');

            return true;

        } catch (error) {
    
            console.error('Error clearing all keys in the cluster:', err);

            throw err;

        }
    };

    async clearOneCluster(cacheKey){

        try{

            await this.redisClient.del(cacheKey);

            return true
        }
        catch(error){

            console.error('Error clearing key in the cluster:', error);

            throw error;
        }
    }

};

module.exports = new RedisCacheService();