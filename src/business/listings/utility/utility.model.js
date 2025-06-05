const { Model } = require("objection");

class UtilityModel extends Model {

    static get tableName() {
        return 'ListingUtilities';
    }

    static get idColumn() {
        return 'id';
    }

    static get Fields() {
        return {
            ID: 'id',
            LISTING_ID: 'listingId',
            UTILITY_ID: 'utilityId',
        };
    }

    $parseDatabaseJson(json) {
        json = super.$parseDatabaseJson(json);

        return json;
    }

    static relationMappings(){

        return {
            
        }
    }
};

module.exports = UtilityModel;