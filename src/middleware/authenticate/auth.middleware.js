const passport = require("passport");
const { errorResponse } = require("../../responses/responses");

const authenticateJWT = (req, res, next) => {

    passport.authenticate(
        "jwt",
        { session: false, },
        (err, user, info) => {

            if (err) {
                return next(err);
            }

            if (!user) return errorResponse(res, 'Unauthorized - failed to authenticate.', 401, {})
            
            req.user = user;

            next();
        }
    )(req, res, next);

};

module.exports = authenticateJWT;