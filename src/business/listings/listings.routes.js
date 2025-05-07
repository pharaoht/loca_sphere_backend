const express = require('express');

const { httpGetBedroomAdmenitiesByListingId, httpGetListingHostDetails } = require('./listings.controller');

const resource = '/listings';

const listingsRouter = express.Router();

listingsRouter.get(`${resource}/bedroom/amenities/:listId`, httpGetBedroomAdmenitiesByListingId);

listingsRouter.get(`${resource}/bedroom/list-details/:listId`, httpGetListingHostDetails);

module.exports = listingsRouter;