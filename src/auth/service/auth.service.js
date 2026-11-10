require('dotenv').config();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


class AuthService {

    static sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    static sevenDaysInSeconds = AuthService.sevenDaysInMs / 1000;
    static fifteenMinutesInMs = 15 * 60 * 1000;

    static cookieOptionsObj = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'PROD',
        sameSite: 'lax',
        path: '/', // Crucial for Next.js middleware / server components to see it globally
        domain: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'PROD') ? '.loca-sphere.dev' : undefined, // Let localhost default naturally
        maxAge: AuthService.sevenDaysInMs,
    }

    static generateSessionId(){
        return crypto.randomUUID();
    }

    static signAccessToken(userId) {

        return jwt.sign(
            { id: userId },
            process.env.JWT_SECRET,
            { expiresIn: '20m' }
        )
    };

    static signRefreshToken(userId, sessionId){
        return jwt.sign(
            { sub: userId, sid: sessionId },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
    };

    static hash(token) {
        return crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');
    };

    static verifyToken(refreshToken){
        
        return jwt.verify(refreshToken, process.env.JWT_SECRET)
    }
};

module.exports = AuthService;