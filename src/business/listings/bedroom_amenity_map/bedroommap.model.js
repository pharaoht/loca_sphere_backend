const { Model } = require("objection");
const ListingsModel = require('../listings.model');
const BedroomAmenityModel = require("../bedroom_amenity/bedroom.model");

class BedroomAmenityMapModel extends Model {

    static get tableName(){
        return 'ListingBedroomAmenities'
    }

    static get idColumn(){
        return 'id'
    }

    static get Fields(){

        return {
            ID: 'id',
            LISTING_ID: 'listingId',
            BEDROOM_AMENITY_ID: 'bedroomAmenityId'
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['listingId', 'bedroomAmenityId'],
            properties: {
                id: { type: 'integer' },
                listingId: { type: 'string', minLength: 21, maxLength: 21 },
                bedroomAmenityId: { type: 'integer' },
            },
        };
    }

    static get relationMappings(){

        const x = `${BedroomAmenityMapModel.tableName}.${BedroomAmenityMapModel.Fields.BEDROOM_AMENITY_ID}`;
        const xx = `${BedroomAmenityModel.tableName}.${BedroomAmenityModel.Fields.ID}`;

        return {

            bedroomAmenity: {
                relation: Model.BelongsToOneRelation,
                modelClass: BedroomAmenityModel,
                join: {
                    from: x,
                    to: xx
                },
            }

        }
    }
};

module.exports = BedroomAmenityMapModel;