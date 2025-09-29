const passport = require('passport');
const jwt = require('jsonwebtoken');

const nanoid = async () => {
  const { nanoid } = await import('nanoid');
  return nanoid(19);
};


async function httpOAuthLogin(req, res, next) {

	passport.authenticate('google', {
		scope: ['email', 'profile'],
        session: false
	})(req, res, next);
}

//when user signs in for first time with google oauth this runs
async function httpOAuthCallback(req, res, next) {

	//session: false, means its stateless, not stored in db, change to redis?
	passport.authenticate('google', { session: false }, (err, user) => {

		if (err || !user) {
			return res.redirect('/api/auth/failure');
		}
  
		const accessToken = jwt.sign(
			{ id: user.id },
			process.env.JWT_SECRET,
			{ expiresIn: '30m' }
		);

		const refreshToken = nanoid();

		// //store refresh token in cookie
		res.cookie('refresh_token', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
		})
		
		// Send access token in response (client keeps in memory, not localStorage)
		return res.redirect('http://localhost:3000/')

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

		const refreshToken = req.cookie.refresh_token;

		if(!refreshToken) return res.sendStatus(401);

		jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, user) => {

			if(err) return res.sendStatus(403);

			const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });

			const newRefreshToken = jwt.sign({ id: user.id, type: 'refresh' }, process.env.JWT_REFRESH, { expiresIn: '7d' });

			//store refresh token in cookie
			res.cookie('refresh_token', newRefreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
			})

			res.json({ accessToken: newAccessToken })
		})
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
	httpRefreshToken
}


//On day 8 → cookie is gone, browser doesn’t send it. User is effectively logged out.
//On day 20 → still logged in fine, because cookie is renewed each time you refresh it.
//On day 31 → JWT inside cookie is expired, backend rejects it even if cookie exists.