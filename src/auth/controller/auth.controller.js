const passport = require('passport');
const jwt = require('jsonwebtoken');

async function httpOAuthLogin(req, res, next) {

	passport.authenticate('google', {
		scope: ['email', 'profile'],
        session: false
	})(req, res, next);
}


async function httpOAuthCallback(req, res, next) {
	passport.authenticate('google', { session: false }, (err, user) => {

		if (err || !user) {
			return res.redirect('/api/auth/failure');
		}
  
		const token = jwt.sign(
			{ id: user.id },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		);


		res.redirect(`http://localhost:3000/success?token=${token}`);

	})(req, res, next);
}

async function httpLogout(req, res){

    req.logout();

    res.clearCookie('token');

    res.clearCookie('userSession')

    return res.redirect('/')
}

async function httpOAuthFailure(req, res){
    
    return res.json({'error': 'Something went wrong'})
}

module.exports = {
    httpOAuthLogin,
    httpOAuthCallback,
    httpLogout,
    httpOAuthFailure
}