require('dotenv').config();

const passport = require('passport');

const UserModel = require('../../business/users/users.model');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');

async function verifyCallback(accesToken, refreshToken, profile, done){

    try{

        let user = await UserModel.query().findOne({ googleId: profile.id });
     
        if(!user){
            user = await UserModel.query().insert({
                [UserModel.Fields.GOOGLE_ID]: profile.id,
                [UserModel.Fields.EMAIL]: profile.emails[0].value,
                [UserModel.Fields.GIVEN_NAME]: profile.name.givenName,
                [UserModel.Fields.SURNAME]: profile.name.familyName,
                [UserModel.Fields.SECOND_SURNAME]: '',
                [UserModel.Fields.PFP]: profile.photos?.[0]?.value
            })
        }

        done(null, user);
    }
    catch(error){
        console.log(error)
        done(error, null);
    }

};

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

passport.use(new GoogleStrategy(
    {
        callbackURL: process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/api/auth/google/callback' : `${process.env.BACKEND_DOMAIN}api/auth/google/callback'`,
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    },
    verifyCallback
));

//runs whenever auth middleware is called
passport.use(new JWTStrategy(opts, async (jwtPayload, done) => {

    try {

        const user = await UserModel.query().findById(jwtPayload.id);

        if(user) return done(null, user);

        else return done(null, false);

    }
    catch(err){

        return done(err, false);

    }
}))


module.exports = passport;