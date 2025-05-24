const { Model } = require("objection");

class AmenityTypeModel extends Model {

    static get tableName(){
        return 'AmenitiesTypes'
    }

    static get Fields(){
        return {
            ID: 'id',
            NAME: 'name'
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
            },
        };
    }
};

module.exports = AmenityTypeModel;