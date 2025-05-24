const express = require('express');
const { httpGetAmenityByListingId } = require('./amenitymap.controller');

const resource = '/amenity';

const amenityRouter = express.Router();

amenityRouter.get(`${resource}/:listId`, httpGetAmenityByListingId);

module.exports = amenityRouter;