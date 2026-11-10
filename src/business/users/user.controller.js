require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserRepository = require('./users.repository');
const { successResponse, errorResponse } = require('../../responses/responses');
const UserService = require('./user.service');
const RedisCacheService = require('../../services/cache/redis.cache');

/**
 * @param {Request} req
 * @param {Response} res
 */
async function httpGetUserInfo(req, res, next) {
    
    try{

        console.log("*** httpGetUserInfo running ***");

        const user = await UserRepository.repoGetUserDetailsById(req.user.id);

        if (!user) {

            console.warn("** User not found **");

            return errorResponse(res, 'User not found', 404, {});
        }

        return successResponse(res, user, 'success', 200);

    }
    catch(error){

        return res.status(500).json({ error: 'Invalid or expired token' })
    }
};

/**
 * @param {Request} req
 * @param {Response} res
 */
async function httpPatchUserDetails(req, res, next){

    try {

        const userId = req.user.id;
        const body = req.body;

        const didUserUpdate = await UserRepository.repoUpdateUserDetails(userId, body);

        if(!didUserUpdate){

            console.error('could not update user');

            return errorResponse(res, 'could not update user', 400);
        }

        return successResponse(res, didUserUpdate, 'update user successful', 200);
    }
    catch(error){

        console.error(error);
  
        return errorResponse(res, error, 500);
    }
}

/**
 * @param {Request} req
 * @param {Response} res
*/
async function httpGetUserOptions(req, res, next){

    try {

        const { option } = req.params;

        const model = UserService.mapOptionsToModel(option);

        if(!model) return errorResponse(res, 'no options found', 404);

        const redisKey = `User:option:${option}`;

        const doesExists = await RedisCacheService.doesExists(redisKey);

        if(RedisCacheService.isConnected && doesExists ){

            const cache = await RedisCacheService.get(redisKey);

            return successResponse(res, cache, 'retrival of cached data', 200);
        }

        const results = await UserRepository.repoGetUserOptions(model);

        if(RedisCacheService.isConnected && !doesExists){

            await RedisCacheService.set(redisKey, results, { EX: 7 * 24 * 60 * 60 * 1000 });
        }

        return successResponse(res, results, 'success', 200)

    }
    catch(error){

        console.error(error);

        return errorResponse(res, error, 500);
    }
}


module.exports = {
    httpGetUserInfo,
    httpPatchUserDetails,
    httpGetUserOptions
}