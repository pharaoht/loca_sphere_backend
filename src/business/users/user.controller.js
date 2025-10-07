require('dotenv').config();

const jwt = require('jsonwebtoken');

const UserModel = require('../users/users.model');

async function httpGetUserInfo(req, res, next) {
    
    try{

        const authHeader = req?.headers?.authorization;

	    if (!authHeader) return res.status(401).json({ error: "Missing token" });

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.query().findById(decoded.id);

        if (!user) return res.status(404).json({ error: "User not found" });
        
		res.status(200).json(user.toJSON());
    }
    catch(error){

        return res.status(500).json({ error: 'Invalid or expired token' })
    }
};


module.exports = {
    httpGetUserInfo
}