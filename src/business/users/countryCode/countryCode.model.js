const Objection = require('objection');

class CountryCallingCode extends Objection.Model {

    static get tableName(){
        return 'CountryCallingCodes'
    }

    static get idColumn() {
        return 'id'
    }

    static get Fields() {
        return {
            ID: 'id',
            COUNTRY_NAME: 'countryName',
            CALLING_CODE: 'callingCode'
        };
    };

        static get jsonSchema(){

        return {
            type: 'object',
            required: [
                CountryCallingCode.Fields.COUNTRY_NAME,
                CountryCallingCode.Fields.CALLING_CODE
            ],
            properties: {
                [CountryCallingCode.Fields.COUNTRY_NAME]: { type: 'string', maxLength: 100 },
                [CountryCallingCode.Fields.CALLING_CODE]: { type: 'string', maxLength: 5 }
            }
        }
    }
};

module.exports = CountryCallingCode;