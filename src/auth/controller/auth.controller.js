require('dotenv').config();
const passport = require('passport');
const instance = require('../../services/cache/redis.cache');
const ListingsRepository = require('../../business/listings/listings.repository');
const { successResponse, errorResponse } = require('../../responses/responses');
const AuthService = require('../service/auth.service');

async function httpOAuthLogin(req, res, next) {

	passport.authenticate('google', {
		scope: ['email', 'profile'],
        session: false
	})(req, res, next);
}

async function httpOAuthCallback(req, res, next) {
	//when user signs in for first time with google oauth this runs

	//session: false, means its stateless, not stored in db, change to redis?
	passport.authenticate('google', { session: false }, async (err, user) => {

		const redirect = process.env.NODE_ENV === 'dev' ? process.env.LOCAL_DOMAIN : process.env.PROD_DOMAIN;

		if (err || !user) {
			return res.redirect('/api/auth/failure');
		}

		const sessionId = AuthService.generateSessionId()
		const rfTk = AuthService.signRefreshToken(user.id, sessionId);
		const accessToken = AuthService.signAccessToken(user.id);

		await instance.set(
			`refresh:${sessionId}`,
			JSON.stringify(
				{ 
					userId: user.id, 
					tokenHash: AuthService.hash(rfTk) 
				}
			),
			{ EX: AuthService.sevenDaysInSeconds }
		)
		
		res.cookie('access_token', accessToken, AuthService.cookieOptionsObj);
		res.cookie('refresh_token', rfTk, AuthService.cookieOptionsObj);

		return res.redirect(`${redirect}/`)

	})(req, res, next);
}

async function httpLogout(req, res){

	try {
		const refreshToken = req?.cookies?.refresh_token;

		// If a refresh token exists, invalidate its session
		if (refreshToken) {

			try {

				const payload = jwt.verify(
					refreshToken,
					process.env.REFRESH_SECRET
				);

				await instance.clearOneCluster(
					`refresh:${payload.sid}`
				);

			}
			catch (err) {
				// Ignore invalid/expired refresh token.
				// We still want to clear cookies.
				console.warn("Logout: invalid refresh token");
			}

		}

		// Remove cookies
		res.clearCookie(
			"access_token",
			getAccessCookieOptions()
		);

		res.clearCookie(
			"refresh_token",
			getRefreshCookieOptions()
		);

		return res.status(200).json({
			success: true
		});

	}
	catch (error) {

		console.error(error);

		return res.status(500).json({
			error: error.message
		});

	}
}

async function httpOAuthFailure(req, res){
    
	console.error('Authentication error');

    return res.json({'error': 'Something went wrong'})
}

async function httpRefreshToken(req, res){

	try {
		
		console.log('** refresh endpoint init **');
		
		const oldrefreshToken = req?.cookies?.refresh_token;

		if(!oldrefreshToken) return errorResponse(res, 'No token was provided', 401);
		
		let payload;

		try {

			payload = AuthService.verifyToken(oldrefreshToken);
		}
		catch(error){

			console.error('** refresh token verification failed **', error);

			return errorResponse(res, 'invalid refresh token', 401);	
		}

		const { sub: userId, sid: sessionId } = payload;

		const session = await instance.get(`refresh:${sessionId}`);

		if(!session) {
			console.warn('** refresh session not found **');
			return errorResponse(res, 'refresh session not found', 401);
		}

		const parsedSession = JSON.parse(session);

		if(parsedSession.tokenHash !== AuthService.hash(oldrefreshToken)){

			await instance.clearOneCluster(`refresh:${sessionId}`);

			console.warn('** refresh token does not match session **');
			
			return errorResponse(res, 'refresh token does not match session', 401);
		} 
		
		const newSessionId = AuthService.generateSessionId()

		const newAccessToken = AuthService.signAccessToken(userId);

		const newRefreshToken = AuthService.signRefreshToken(
			userId,
			newSessionId
		);

		await instance.set(
			`refresh:${newSessionId}`,
			JSON.stringify({
				userId,
				tokenHash: AuthService.hash(newRefreshToken)
			}),
			{
				EX: AuthService.sevenDaysInSeconds
			}
		);

		await instance.clearOneCluster(`refresh:${sessionId}`);

		// Set cookies
		res.cookie("access_token", newAccessToken, AuthService.cookieOptionsObj);

		res.cookie("refresh_token", newRefreshToken, AuthService.cookieOptionsObj);

		return successResponse(res,null,"successful auth",200);
	
	}
	catch(error){

		console.error(error);

		res.status(500).json({ error: error });
	}
}

/**
 * Server-only ownership check.
 * Uses the HTTP-only refresh_token cookie as a session reference.
 * Safe because this endpoint is only called server-to-server (SSR fetch).
 */
async function httpOwnership(req, res){
	//todo, check if listing is already cached in redis
	try {

		console.log('** checking ownership **', req?.cookies?.refresh_token);

		const { listingId } = req.params;

		if (!listingId) {
			return res.status(400).json({
				success: false,
				message: "No listing id was passed"
			});
		}

		const listing = await ListingsRepository.repoGetListingById(listingId);

		if (!listing) {
			return res.status(404).json({
				success: false,
				message: "Listing not found"
			});
		}

		// Passport populated this for us
		if (String(req.user.id) === String(listing.userId)) {
			return res.status(200).json({
				success: true
			});
		}

		return res.status(403).json({
			success: false,
			message: "Not allowed"
		});

	}
	catch(error){
		
		console.error(error);

		res.status(500).json({ error: error });
	}
}

module.exports = {
    httpOAuthLogin,
    httpOAuthCallback,
    httpLogout,
    httpOAuthFailure,
	httpRefreshToken,
	httpOwnership
}


//On day 8 → cookie is gone, browser doesn’t send it. User is effectively logged out.
//On day 20 → still logged in fine, because cookie is renewed each time you refresh it.
//On day 31 → JWT inside cookie is expired, backend rejects it even if cookie exists.