const express = require('express');

const authenticateJWT = require('../../middleware/authenticate/auth.middleware');

const { httpGetUserInfo } = require('./user.controller');

const resource = '/users';

const usersRouter = express.Router();

usersRouter.get(`${resource}/me`, authenticateJWT, httpGetUserInfo);

module.exports = usersRouter;