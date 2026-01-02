const UserModel = require("./users.model");

class UserRepository {

    static async repoGetUserDetailsById(id = ''){

        try {

            if(!id) return false;

            const data = await UserModel.query().findById(id);

            return data;
        }
        catch(error){

            return false;
        }
    }

    static async repoUpdateUserDetails(userId = '', userData = undefined){

        try{

        
        if(!userId || !userData) return false;

            const didUserUpdate = await UserModel.query().patchAndFetchById(userId, userData);
            
            return didUserUpdate;
        }
        catch(error){

            console.error(error, '**************');
            
            return false
        }
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
    
        const userDetails = await UserModel.query().findById(userId);

        for(const key in userDetails){

            if(key !== UserModel.Fields.SECOND_SURNAME && !userDetails[key]){
                return false
            }
        }

        return true;
    }
};

module.exports = UserRepository;