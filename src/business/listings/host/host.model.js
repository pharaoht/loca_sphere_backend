const { Model } = require("objection");
const GenderModel  = require("../gender/gender.model");
const moment = require('moment');

class HostModel extends Model {

    static get tableName(){

        return 'ListingHostInfo'
    }

    static get idColumn(){
        return 'id'
    }

    static get Fields(){

        return {
            ID: 'id',
            LISTING_ID: 'listingId',
            LIVES_IN_PROP: 'livesInProperty',
            HOST_GENDER: 'hostGender',
            HOST_AGE_RANGE: 'hostAgeRange',
            LIVES_WITH_FAM: 'livesWithFamily',
            HAS_PETS: 'hasPets',
            IS_VERIFIED: 'isVerified',
            CREATED_AT: 'createdAt',
            GENDER_ALLOWED_ID: 'genderAllowedId',
            USER_ID: 'userId'
        }
    }

    $parseDatabaseJson(json) {
        
        json = super.$parseDatabaseJson(json);
        
        json[HostModel.Fields.HAS_PETS] = json[HostModel.Fields.HAS_PETS] == 0 ? false : true;
        json[HostModel.Fields.LIVES_IN_PROP] = json[HostModel.Fields.LIVES_IN_PROP] == 0 ? false : true;
        json[HostModel.Fields.HOST_GENDER] = json[HostModel.Fields.HOST_GENDER] == 0 ? 'male' : 'female';
        json[HostModel.Fields.LIVES_WITH_FAM] = json[HostModel.Fields.LIVES_WITH_FAM] == 0 ? false : true;
        json[HostModel.Fields.IS_VERIFIED] = json[HostModel.Fields.IS_VERIFIED] == 0 ? false : true;
        json[HostModel.Fields.CREATED_AT] = moment(json[HostModel.Fields.CREATED_AT]).format('YYYY MMM DD')
        
        return json;
    }

    static get relationMappings(){

        const x = `${HostModel.tableName}.${HostModel.Fields.GENDER_ALLOWED_ID}`;
        const xx = `${GenderModel.tableName}.${GenderModel.Fields.ID}`;

        return {
            genderMapping: {
                relation: Model.HasOneRelation,
                modelClass: GenderModel,
                join: {
                    from: x,
                    to: xx
                }
            }
        }
    }
};

module.exports = HostModel;