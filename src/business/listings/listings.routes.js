const express = require('express');

const { httpDynamicGetListingDetails, httpGetListingOptions, httpCreateListing } = require('./listings.controller');

const addressRouter = require('./address/address.routes');

const resource = '/listings';

const listingsRouter = express.Router();

listingsRouter.use(`${resource}/address`, addressRouter);

listingsRouter.get(`${resource}/options/:option`, httpGetListingOptions);

listingsRouter.get(`${resource}/:listId`, httpDynamicGetListingDetails);

listingsRouter.post(`${resource}/:stepNum`, httpCreateListing);

module.exports = listingsRouter;