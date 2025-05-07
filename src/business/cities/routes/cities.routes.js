const express = require('express');

const { httpQueryCities } = require('../controller/cities.controller')

const resource = '/cities';

const cityRouter = express.Router();

cityRouter.get(`${resource}`, httpQueryCities)

module.exports = cityRouter;