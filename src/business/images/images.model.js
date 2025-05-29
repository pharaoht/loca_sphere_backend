const { Model } = require("objection");

class ImagesModel extends Model {

    static get tableName(){
        return 'ListingPhotos'
    }

    static get idColumn(){
        return 'id'
    }

    static get Fields(){

        return {
            ID: 'id',
            LISTING_ID: 'listingId',
            URL: 'url',
            IS_PRIMARY: 'isPrimary',
            AMENITY_TYPE_ID: 'amenityTypeId',
            CREATED_AT: 'createdAt'
        }
    }

    static get relationMappings(){
        
    }
};

module.exports = ImagesModel