const Nationality = require("./nationality/nationality.model");
const Occupation = require("./occupation/occupation.model");

class UserService {

    static get userMapModel(){

        return {
            nationality: Nationality,
            occupation: Occupation
        }
    }

    static mapOptionsToModel(optionParam = ''){
   
        if(!Object.hasOwn(UserService.userMapModel, optionParam)) return undefined;

        return UserService.userMapModel[optionParam];
    }
}

module.exports = UserService;