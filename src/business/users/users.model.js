const { Model } = require("objection");

class UserModel extends Model {

    static get tableName(){
        return 'Users'
    }

    static get idColumn(){

    }

    static get Fields(){

        return {
            ID: 'id',
            GIVEN_NAME: 'givenName',
            SURNAME: 'surName ',
            SECOND_SURNAME: 'secondSurName',
            CREATED_AT: 'createdAt',
            UPDATED_AT: 'updatedAt'
        }
    }

    static get jsonSchema(){

        return {
            type: 'object',
            required: [
                UserModel.Fields.GIVEN_NAME,
                UserModel.Fields.SURNAME,
            ],
            properties: {
                [UserModel.Fields.ID]: { type: 'string', maxLength: 21 },
                [UserModel.Fields.GIVEN_NAME]: { type: 'string', maxLength: 255 },
                [UserModel.Fields.SURNAME]: { type: 'string', maxLength: 255 },
                [UserModel.Fields.SECOND_SURNAME]: { type: 'string', maxLength: 255 },
                [UserModel.Fields.CREATED_AT]: { type: 'string', format: 'date-time' },
                [UserModel.Fields.UPDATED_AT]: { type: 'string', format: 'date-time' },
            }
        }
    }

    static get relationMappings(){

    }
};

module.exports = UserModel;