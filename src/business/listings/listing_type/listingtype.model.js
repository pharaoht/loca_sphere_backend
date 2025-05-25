const { Model } = require('objection');

class ListingTypeModel extends Model {

    static get tableName(){
        return 'ListingTypes'
    }

    static get idColumn(){
        return 'id'
    }

    static get Fields(){
        
        return {
            ID: 'id',
            NAME: 'name',
        }
    }
};

module.exports = ListingTypeModel;