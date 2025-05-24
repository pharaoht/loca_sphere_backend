const { Model } = require("objection");

class BedroomAmenityModel extends Model {

    static get tableName(){
        return 'BedroomAmenities'
    }

    static get idColumn(){
        return 'id'
    }

    static get Fields(){

        return {
            ID: 'id',
            NAME: 'name',
            ICON: 'icon',
        }
    }
};

module.exports = BedroomAmenityModel;