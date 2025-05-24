const { Model } = require("objection");

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

    static get relationMappings(){

    }
};

module.exports = HostModel;