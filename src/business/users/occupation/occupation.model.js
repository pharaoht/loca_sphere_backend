const Objection = require("objection");

class Occupation extends Objection.Model {

    static get tableName() {
        return 'Occupation';
    }

    static get idColumn() {
        return 'id'
    }

    static get Fields() {
        return {
            ID: 'id',
            OCCUPATION_NAME: 'occupationName'
        };
    };

}

module.exports = Occupation;