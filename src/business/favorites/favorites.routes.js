const express = require('express');

const authenticateJWT = require('../../middleware/authenticate/auth.middleware');

const { idempotencyMiddleware } = require('../../middleware/idempotency/idempotency.middleware');

const { httpGetFavorites } = require('./favorites.controller');

const resource = '/favorites';

const favoritesRouter = express.Router();

favoritesRouter.get(`${resource}`, authenticateJWT, httpGetFavorites);

//delete favorite
//update favorite
//create favorite -> auth/idempotency -> from body listingId/notes

module.exports = favoritesRouter;