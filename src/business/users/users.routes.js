const express = require('express');

const authenticateJWT = require('../../middleware/authenticate/auth.middleware');

const { httpGetUserInfo, httpPatchUserDetails } = require('./user.controller');

const resource = '/users';

const usersRouter = express.Router();

usersRouter.get(`${resource}/me`, authenticateJWT, httpGetUserInfo);

usersRouter.patch(`${resource}`, authenticateJWT, httpPatchUserDetails);

module.exports = usersRouter;