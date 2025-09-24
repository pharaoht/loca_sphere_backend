const express = require('express');

const { httpOAuthLogin, httpOAuthCallback, httpLogout, httpOAuthFailure } = require('../controller/auth.controller');

const authRouter = express.Router();

const resource = '/auth';

authRouter.get(`${resource}/google`, httpOAuthLogin);

authRouter.get(`${resource}/google/callback`, httpOAuthCallback);

authRouter.get(`${resource}/failure`, httpOAuthFailure);

authRouter.get(`${resource}/logout`, httpLogout);

module.exports = authRouter;
