const { Model } = require('objection');

class UtilityModel extends Model {

    static get tableName() {
        return 'Utility';
    }

    static get idColumn() {
        return 'id';
    }

    static get Fields() {
        return {
            ID: 'id',
            LISTING_ID: 'listingId',
            WATER_INCLUDED: 'waterIncluded',
            ELECTRIC_INCLUDED: 'electricIncluded',
            GAS_INCLUDED: 'gasIncluded',
            INTERNET_INCLUDED: 'internetIncluded',
            CLEANING_INCLUDED: 'cleaningIncluded',
            CLEANING_FEE: 'cleaningFee'
        };
    }

    $parseDatabaseJson(json) {

        json = super.$parseDatabaseJson(json);

        json[UtilityModel.Fields.WATER_INCLUDED] = UtilityModel.Fields.WATER_INCLUDED == 0 ? false : true;
        json[UtilityModel.Fields.ELECTRIC_INCLUDED] = UtilityModel.Fields.ELECTRIC_INCLUDED == 0 ? false : true;
        json[UtilityModel.Fields.GAS_INCLUDED] = UtilityModel.Fields.GAS_INCLUDED == 0 ? false : true;
        json[UtilityModel.Fields.INTERNET_INCLUDED] = UtilityModel.Fields.INTERNET_INCLUDED == 0 ? false : true;
        json[UtilityModel.Fields.CLEANING_INCLUDED] = UtilityModel.Fields.CLEANING_INCLUDED == 0 ? false : true;

        return json;
    }

}

module.exports = UtilityModel;