const { Model } = require("objection");

class AmenityModel extends Model {

    static get tableName(){
        return 'Amenities'
    }

    static get idColumn(){
        return 'id'
    }

    static get Fields(){

        return {
            ID: 'id',
            AMENITY_NAME: 'amenityName'
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [ AmenityModel.Fields.AMENITY_NAME ],
            properties: {
                id: { type: 'integer' },
                amenityName: { type: 'string', maxLength: 255 },
            },
        };
    } 
};

module.exports = AmenityModel