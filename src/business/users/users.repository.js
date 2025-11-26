const UserModel = require("./users.model");

class UserRepository {

    static async repoGetUserDetailsById(id = ''){

        if(!id) return false;

        const data = await UserModel.query().findById(id);

        return data;
    }

    static async repoUpdateUserDetails(userId = '', userData = {}){

        if(!userId) return false;

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
};

module.exports = UserRepository;