const express = require('express');

const { httpGetListingById } = require('./listings.controller');

const resource = '/listings';

const listingsRouter = express.Router();

listingsRouter.get(`${resource}/:listId`, httpGetListingById);

module.exports = listingsRouter;