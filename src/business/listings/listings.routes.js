const express = require('express');

const { httpGetListingById, httpGetHostDetailsByListingId, httpGetUtilitiesByListingId } = require('./listings.controller');

const resource = '/listings';

const listingsRouter = express.Router();

listingsRouter.get(`${resource}/:listId`, httpGetListingById);

listingsRouter.get(`${resource}/host-details/:listId`, httpGetHostDetailsByListingId);

listingsRouter.get(`${resource}/utilities/:listId`, httpGetUtilitiesByListingId)

module.exports = listingsRouter;