const { Model } = require("objection");

class CurrencyModel extends Model {

    static get tableName(){
        return 'Currencies'
    }

    static get idColumn(){
        return 'id'
    }

    static get Fields(){

        return {
            ID: 'id',
            CODE: 'code',
            SYMBOL: 'symbol',
            CREATED_AT: 'created_at'
        }
    }

    $parseDatabaseJson(json){

        json = super.$parseDatabaseJson(json);

        delete json[CurrencyModel.Fields.CREATED_AT];

        return json;

    }
};

module.exports = CurrencyModel;