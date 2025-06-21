const { Model } = require("objection");
const AmenityModel = require("../amenity/amenity.model");
const ListingsModel = require("../listings.model");
const AmenityTypeModel = require("../amenity_type/amenitytype.model");
const ImagesModel = require("../../images/images.model");

class AmenityMapModel extends Model {

    static get tableName(){
        return 'ListingAmenities';
    }

    static get idColumn(){
        return 'id'
    }

    static get Fields(){

        return {
            ID: 'id',
            LISTING_ID: 'listingId',
            AMENITY_TYPE_ID: 'amenityTypeId',
            ROOM_NUM: 'roomNumber',
            AMENITY_ID: 'amenityId'
        }
    }

    $parseDatabaseJson(json){

        return json
    }

    static get relationMappings(){

        const k =  `${AmenityMapModel.tableName}.${AmenityMapModel.Fields.AMENITY_ID}`;
        const l = `${AmenityModel.tableName}.${AmenityModel.Fields.ID}`;

        const c = `${AmenityMapModel.tableName}.${AmenityMapModel.Fields.AMENITY_TYPE_ID}`;
        const cc = `${AmenityTypeModel.tableName}.${AmenityTypeModel.Fields.ID}`;

        return {

            listingAmenityMap: {
                relation: Model.BelongsToOneRelation,
                modelClass: AmenityModel,
                join: {
                    from: k,
                    to: l
                }
            },

            amenityTypeMap: {
                relation: Model.BelongsToOneRelation,
                modelClass: AmenityTypeModel,
                join: {
                    from: c,
                    to: cc
                }
            },

            imagesMap: {
                relation: Model.BelongsToOneRelation,
                modelClass: ImagesModel,
                join: {
                    from:'',
                    to: ''
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['listingId', 'amenityTypeId', 'amenityId'],
            properties: {
                id: { type: 'integer' },
                listingId: { type: 'string', minLength: 21, maxLength: 21 },
                amenityTypeId: { type: 'integer' },
                roomNumber: { type: ['integer', 'null'] },
                amenityId: { type: 'integer' },
            },
        };
    }
};

module.exports = AmenityMapModel;