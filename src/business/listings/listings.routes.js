const express = require('express');

const { httpDynamicGetListingDetails } = require('./listings.controller');

const addressRouter = require('./address/address.routes');

const resource = '/listings';

const listingsRouter = express.Router();

listingsRouter.use(`${resource}/address`, addressRouter);

listingsRouter.get(`${resource}/:listId`, httpDynamicGetListingDetails);

module.exports = listingsRouter;