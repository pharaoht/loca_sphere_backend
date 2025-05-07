const express = require('express');

const { httpgetAddressById, httpgetAddressesByCoordinatesRadius } = require('./address.controller');

const resource = '/address';

const addressRouter = express.Router();

addressRouter.get(`${resource}/coordinates`, httpgetAddressesByCoordinatesRadius);

addressRouter.get(`${resource}/:id`, httpgetAddressById);


module.exports = addressRouter;