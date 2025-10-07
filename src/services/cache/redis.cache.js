const redis = require('redis');

require('dotenv').config();

const ENVIRONMENT = process.env.NODE_ENV;
const DOMAIN = process.env.REDIS_URL;
const LOCALDOMAIN = 'redis://localhost:6379';

class RedisCacheService {

    constructor(){
        //singleton Design pattern to prevent multi-instances
        if(!RedisCacheService.instance){

            console.log('*** creating redis client ***');

            this.redisClient = redis.createClient({
                url: ENVIRONMENT === 'production' ? DOMAIN : LOCALDOMAIN,
                socket: {
                    reconnectStrategy: function(retries) {
                        
                        if (retries > 5) {
                        
                            console.log('Too many attempts to reconnect. Redis connection was terminated');
                        
                            return new Error('Too many retries.');
        
                        } 
                        else return retries * 500;
                    }
                }
            });
        
            this.redisClient.on('error', (err) => {

                this.isConnected = false;
                
                console.error('Redis client error:', err)
            });

            this.redisClient.on('end', () => console.error('Redis connection closed. Exiting.'));
        
            this.redisClient.connect().then(() => {
        
                this.isConnected = true;

                console.log('*** redis instance created ***');

            }).catch(console.error);

            RedisCacheService.instance = this;

        }

        return RedisCacheService.instance;
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

const instance = new RedisCacheService();

module.exports = instance;