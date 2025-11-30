const { Model } = require("objection");

const nanoid = async () => {
  const { nanoid } = await import('nanoid');
  return nanoid(19);
};

class UserModel extends Model {

    static get tableName(){
        return 'Users'
    }

    static get idColumn(){
        return UserModel.Fields.ID
    }

    static get Fields(){

        return {
            ID: 'id',
            GOOGLE_ID: 'googleId',
            GIVEN_NAME: 'givenName',
            SURNAME: 'surName ',
            SECOND_SURNAME: 'secondSurName',
            EMAIL: 'email',
            PFP: 'pfp',
            GENDER: 'gender',
            BIRTHDAY: 'birthday',
            COUNTRYCODE: 'countryCode',
            PHONENUMBER: 'phoneNumber',
            NATIONALITY: 'nationality',
            OCCUPATION: 'occupation',
            PLACEOFWORK: 'placeOfWork',
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
                UserModel.Fields.GOOGLE_ID,
                UserModel.Fields.EMAIL,
            ],
            properties: {
                [UserModel.Fields.ID]: { type: 'string', maxLength: 21 },
                [UserModel.Fields.GOOGLE_ID]: { type: 'string', maxLength: 255 },
                [UserModel.Fields.GIVEN_NAME]: { type: 'string', maxLength: 255 },
                [UserModel.Fields.SURNAME]: { type: 'string', maxLength: 255 },
                [UserModel.Fields.SECOND_SURNAME]: { type: 'string', maxLength: 255 },
                [UserModel.Fields.EMAIL]: { type: 'string', maxLength: 255, format: 'email' },
                [UserModel.Fields.PFP]: { type: 'string', maxLength: 255 },
                [UserModel.Fields.CREATED_AT]: { type: 'string', format: 'date-time' },
                [UserModel.Fields.UPDATED_AT]: { type: 'string', format: 'date-time' },
            }
        }
    }

    async $beforeInsert(queryContext){

        await super.$beforeInsert(queryContext);

        this[UserModel.Fields.ID] = `us${await nanoid()}`
    }

    async $beforeUpdate(opt, queryContext){

        await super.$beforeUpdate(queryContext);

        delete this.viaEmail;
        delete this.viaWhatsApp;
        for(let key in this){
            if(!this[key]){
                delete this[key]
            }
        }

    }

	$formatJson(json) {
		json = super.$formatJson(json);
        json.displayName = `${json.givenName} ${json.surName}`
		
		delete json.googleId;
		return json;
	}

    static get relationMappings(){

    }
};

module.exports = UserModel;