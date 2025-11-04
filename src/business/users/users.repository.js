const UserModel = require("./users.model");

class UserRepository {

    static async repoGetUserDetailsById(id = ''){

        if(!id) return false;

        const data = await UserModel.query().findById(id);

        return data;
    }
};

module.exports = UserRepository;