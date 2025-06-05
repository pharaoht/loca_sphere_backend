const express = require('express');

const { httpGetListingById, httpGetHostDetailsByListingId } = require('./listings.controller');

const resource = '/listings';

const listingsRouter = express.Router();

listingsRouter.get(`${resource}/:listId`, httpGetListingById);

listingsRouter.get(`${resource}/host-details/:listId`, httpGetHostDetailsByListingId);

module.exports = listingsRouter;