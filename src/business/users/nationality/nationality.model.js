const Objection = require("objection");

class Nationality extends Objection.Model {

    static get tableName() {
        return 'Nationality';
    }

    static get idColumn() {
        return 'id'
    }

    static get Fields() {
        return {
            ID: 'id',
            COUNTRY_NAME: 'countryName'
        };
    };

}

module.exports = Nationality;