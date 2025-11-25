const { errorResponse, successResponse } = require('../../responses/responses');
const redisInstance = require('../../services/cache/redis.cache');
const crypto = require('crypto');

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */


/**
 * @param {Request} req
 * @param {Response} res
 */
async function idempotencyMiddleware(req, res, next){

    let key = req.header('Idempotency-Key');
    const stepNum = req.params?.stepNum || undefined;
    const userId = req.user?.id || 'anon';

    if(!key){
        key = crypto.randomUUID();
        req.generatedIdemKey = key;
    }

    const redisKey = !stepNum ? `${key}:${userId}` : `${key}:${stepNum}:${userId}`;

    const cachedResponse = await redisInstance.get(redisKey);

    if(cachedResponse){
        const message = 'Returning cached response for:';
        const parsed = JSON.parse(cachedResponse);
        return successResponse(res, parsed.body, message, parsed.status);
    };

    const originalJson = res.json.bind(res);

    res.json = async (body) => {
        
        const payload = { status: res.statusCode, body };

        await redisInstance.set(redisKey, JSON.stringify(payload), {
            EX: 60 * 60 * 24
        })

        res.setHeader('Idempotency-Key', redisKey);

        if (req.generatedIdemKey) {
            body.idempotencyKey = req.generatedIdemKey;
        }

        return originalJson(body)
    }

    next();
    
};

module.exports = {
    idempotencyMiddleware
};