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

    static get jsonSchema() {

        return {
            type: 'object',
            required: [
                ImagesModel.Fields.LISTING_ID,
                ImagesModel.Fields.URL,
                ImagesModel.Fields.AMENITY_TYPE_ID,
            ],
            properties: {
                [ImagesModel.Fields.ID]: { type: 'integer' },
                [ImagesModel.Fields.LISTING_ID]: { type: 'string', minLength: 21, maxLength: 21 },
                [ImagesModel.Fields.URL]: { type: 'string', maxLength: 255 },
                [ImagesModel.Fields.IS_PRIMARY]: { type: 'boolean' },
                [ImagesModel.Fields.AMENITY_TYPE_ID]: { type: 'integer', minimum: 0, maximum: 255 },
                [ImagesModel.Fields.CREATED_AT]: { type: 'string', format: 'date-time' },
            }
        }
    }

    static get relationMappings(){
        
    }
};

module.exports = ImagesModel;