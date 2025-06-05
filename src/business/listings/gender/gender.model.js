const { Model } = require("objection");

class GenderModel extends Model {

    static get tableName(){
        return 'Gender'
    }

    static get idColumn() {
        return 'id'
    }

    static get Fields() {
        return {
            ID: 'id',
            SEX: 'sex'
        };
    };
};

module.exports = GenderModel;