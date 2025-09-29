const { Model } = require('objection');
const ListingsModel = require('../listings.model');
const CurrencyModel = require('../currency/currency.model');
const ImagesModel = require('../images/images.model');

class AddressModel extends Model {

    static get tableName() {
        return 'Address';
    }

    static get idColumn() {
        return AddressModel.Fields.ID;
    }

    static get Fields() {
        return {
            ID: 'id',
            LISTING_ID: 'listingId',
            STREET_ADDRESS: 'streetAddress',
            HOUSE_NUMBER: 'houseNumber',
            POSTAL_CODE: 'postalCode',
            CITY: 'city',
            STATE_OR_PROVINCE: 'stateOrProvince',
            COUNTRY_CODE: 'countryCode',
            LATITUDE: 'latitude',
            LONGITUDE: 'longitude',
            EXTRA_INFO: 'extraInfo',
        };
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [AddressModel.Fields.LISTING_ID, AddressModel.Fields.POSTAL_CODE, AddressModel.Fields.COUNTRY_CODE ],
            properties: {
                [AddressModel.Fields.ID]: { type: 'number', maxLength: 21 },
                [AddressModel.Fields.STREET_ADDRESS]: { type: 'string', maxLength: 255 },
                [AddressModel.Fields.HOUSE_NUMBER]: { type: 'string', maxLength: 50 },
                [AddressModel.Fields.POSTAL_CODE]: { type: 'string', maxLength: 20 },
                [AddressModel.Fields.CITY]: { type: 'string', maxLength: 100 },
                [AddressModel.Fields.STATE_OR_PROVINCE]: { type: 'string', maxLength: 100 },
                [AddressModel.Fields.COUNTRY_CODE]: { type: 'string', maxLength: 2 },
                [AddressModel.Fields.LATITUDE]: { type: 'number', minimum: -90, maximum: 90 },
                [AddressModel.Fields.LONGITUDE]: { type: 'number', minimum: -180, maximum: 180 },
                [AddressModel.Fields.EXTRA_INFO]: { type: 'string' },
            }
        };
    }

    static get relationMappings() {
        
        const k = `${AddressModel.tableName}.${AddressModel.Fields.LISTING_ID}`;
        const l = `${ListingsModel.tableName}.${ListingsModel.Fields.ID}`;

        const x = `${ListingsModel.tableName}.${ListingsModel.Fields.CURRENCY_ID}`;
        const xx = `${CurrencyModel.tableName}.${CurrencyModel.Fields.ID}`;

    
        const yy = `${ImagesModel.tableName}.${ImagesModel.Fields.LISTING_ID}`;

        return {
            listing: {
                relation: Model.BelongsToOneRelation,
                modelClass: ListingsModel,
                join: {
                    from: k,
                    to: l
                }
            },
        }
    }

    $parseDatabaseJson(json){

        json = super.$parseDatabaseJson(json);

        json[AddressModel.Fields.LATITUDE] = Number(json[AddressModel.Fields.LATITUDE]).toFixed(6) 
        json[AddressModel.Fields.LONGITUDE] = Number(json[AddressModel.Fields.LONGITUDE]).toFixed(6) 

        return json;
    }
}

module.exports = AddressModel;
