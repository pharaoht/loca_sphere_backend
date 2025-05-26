const express = require('express');

const { httpGetListingHostDetails, httpGetListingUtilities } = require('./listings.controller');

const resource = '/listings';

const listingsRouter = express.Router();

listingsRouter.get(`${resource}/bedroom/list-details/:listId`, httpGetListingHostDetails);

listingsRouter.get(`${resource}/bedroom/utilities/:listId`, httpGetListingUtilities);

module.exports = listingsRouter;