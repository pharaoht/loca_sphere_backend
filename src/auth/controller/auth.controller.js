require('dotenv').config();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const instance = require('../../services/cache/redis.cache');
const ListingsRepository = require('../../business/listings/listings.repository');

const nanoid = async () => {
  const { nanoid } = await import('nanoid');
  return nanoid();
};


async function httpOAuthLogin(req, res, next) {

	passport.authenticate('google', {
		scope: ['email', 'profile'],
        session: false
	})(req, res, next);
}

//when user signs in for first time with google oauth this runs
async function httpOAuthCallback(req, res, next) {
	
	const refreshToken = await nanoid();

	//session: false, means its stateless, not stored in db, change to redis?
	passport.authenticate('google', { session: false }, (err, user) => {

		if (err || !user) {
			return res.redirect('/api/auth/failure');
		}

		//save token in redis
		instance.set(`refresh:${refreshToken}`, user.id, { EX: 7 * 24 * 60 * 60 * 1000  });

		// //store refresh token in cookie
		res.cookie('refresh_token', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
		})
		
		const redirect = process.env.NODE_ENV === 'dev' ? process.env.LOCAL_DOMAIN : process.env.PROD_DOMAIN;

		return res.redirect(`${redirect}/`)

	})(req, res, next);
}

async function httpLogout(req, res){

    req.logout();

    res.clearCookie('refresh_token');

    return res.redirect('/')
}

async function httpOAuthFailure(req, res){
    
    return res.json({'error': 'Something went wrong'})
}

async function httpRefreshToken(req, res){

	try {

		const oldrefreshToken = req?.cookies?.refresh_token;

		if(!oldrefreshToken) return res.sendStatus(401);

		const userId = await instance.get(`refresh:${oldrefreshToken}`);

		if(!userId) return res.sendStatus(403);
		
		const newAccessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });

		const newRefreshToken = await nanoid();

		await instance.set(`refresh:${newRefreshToken}`,
			userId,
			//EX redis deletes this automatically
			{ EX : 7 * 24 * 60 * 60 }
		)

		await instance.clearOneCluster(`refresh:${oldrefreshToken}`)

		//store refresh token in cookie
		res.cookie('refresh_token', newRefreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
		})

		res.json({ accessToken: newAccessToken, statusCode: 200, success: true })
	
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

		const currentRefreshToken = req?.cookies?.refresh_token;
		
		if(!currentRefreshToken) return res.status(401).json({ success: false, message: 'no refresh token found' });

		const { listingId } = req.params;

		if(!listingId) return res.status(400).json({ success: false, message: 'no listing id was passed' });
		
		const listing = await ListingsRepository.repoGetListingById(listingId);

		if(!listing) return res.status(404).json({ success: false, message: 'no listing found with that id' });
	
		const userId = await instance.get(`refresh:${currentRefreshToken}`);

		if(!userId) return res.status(404).json({ success: false, messge: 'no user found with that id' });

		if(String(userId) == String(listing.userId)) return res.status(200).json({ success: true })
	
		return res.status(403).json({ success: false, message: 'not allowed' });

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