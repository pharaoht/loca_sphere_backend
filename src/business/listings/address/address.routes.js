const express = require('express');

const { httpgetAddressById, httpgetAddressesByCoordinatesRadius, httpGeoCodingSearch } = require('./address.controller');

const resource = '/address';

const addressRouter = express.Router();

addressRouter.get(`/coordinates`, httpgetAddressesByCoordinatesRadius);

addressRouter.get(`/geocoding`, httpGeoCodingSearch);

addressRouter.get(`/:id`, httpgetAddressById);


module.exports = addressRouter;