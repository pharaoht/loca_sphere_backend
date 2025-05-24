const express = require('express');

const { httpGetBedroomAmenityByListingId } = require('./bedroommap.controller');

const resource = '/bedroom-amenity';

const bedroomAmenityRouter = express.Router();

bedroomAmenityRouter.get(`${resource}/:listId`, httpGetBedroomAmenityByListingId);

module.exports = bedroomAmenityRouter;