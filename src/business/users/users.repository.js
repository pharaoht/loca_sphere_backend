const UserModel = require("./users.model");

class UserRepository {

    static async repoGetUserDetailsById(id = ''){

        if(!id) return false;

        const data = await UserModel.query().findById(id);

        return data;
    }

    static async repoUpdateUserDetails(userId = '', userData = undefined){

        if(!userId || !userData) return false;

        const didUserUpdate = await UserModel.query().patchAndFetchById(userId, userData);
 
        return didUserUpdate;
    }

    /**
     * @param {typeof import('objection').Model} model
    */
    static async repoGetUserOptions(model){

        const data = await model.query().select('*');

        return data;

    }

    static async repoIsUserProfileComplete(userId = undefined){

        if(!userId) return false;
        //get user from id
        const userDetails = await UserModel.query().findById(userId);

        console.log(userDetails)
        //check if all user.fields are not null
        //profile complete
    }
};

module.exports = UserRepository;