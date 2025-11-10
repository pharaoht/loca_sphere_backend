const express = require('express');

const { httpDynamicGetListingDetails, httpGetListingOptions, httpCreateListing, httpGetListingsByUserId, httpDeleteById } = require('./listings.controller');

const addressRouter = require('./address/address.routes');

const conditionalUpload = require('../../middleware/multer/multer');

const authenticateJWT = require('../../middleware/authenticate/auth.middleware');
const { idempotencyMiddleware } = require('../../middleware/idempotency/idempotency.middleware');

const resource = '/listings';

const listingsRouter = express.Router();

listingsRouter.use(`${resource}/address`, addressRouter);

listingsRouter.get(`${resource}/options/:option`, httpGetListingOptions);

listingsRouter.get(`${resource}/user-id/:userId`, httpGetListingsByUserId);

listingsRouter.get(`${resource}/:listId`, httpDynamicGetListingDetails);

listingsRouter.post(`${resource}/:stepNum`, authenticateJWT,  idempotencyMiddleware, conditionalUpload, httpCreateListing);

listingsRouter.delete(`${resource}/:model/:listingId/:id`, authenticateJWT, httpDeleteById);

module.exports = listingsRouter;