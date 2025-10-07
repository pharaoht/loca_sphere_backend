const express = require('express');

const { httpOAuthLogin, httpOAuthCallback, httpLogout, httpOAuthFailure, httpRefreshToken, httpOwnership } = require('../controller/auth.controller');

const authRouter = express.Router();

const resource = '/auth';

authRouter.get(`${resource}/google`, httpOAuthLogin);

authRouter.get(`${resource}/google/callback`, httpOAuthCallback);

authRouter.get(`${resource}/failure`, httpOAuthFailure);

authRouter.get(`${resource}/logout`, httpLogout);

authRouter.get(`${resource}/refresh`, httpRefreshToken);

authRouter.get(`${resource}/ownership/:listingId`, httpOwnership);

module.exports = authRouter;
