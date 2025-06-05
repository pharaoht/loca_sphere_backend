const moment = require('moment');
const { Model } = require('objection');
const HostModel = require('./host/host.model');
const UserModel = require('../users/users.model');
const CurrencyModel = require('./currency/currency.model');
const ListingTypeModel = require('./listing_type/listingtype.model');

class ListingsModel extends Model {

    static get tableName() {
        return 'Listing';
    }

    static get idColumn() {
        return ListingsModel.Fields.ID;
    }

    static get Fields() {
        return {
            ID: 'id',
            USER_ID: 'userId',
            TITLE: 'title',
            MONTHLY_RENT: 'monthlyRent',
            CURRENCY_ID: 'currencyId',
            DESCRIPTION: 'description',
            BEDROOMS: 'bedrooms',
            BEDS: 'beds',
            BATHROOMS: 'bathrooms',
            ROOM_AREA_SQM: 'roomAreaSqM',
            PLACE_AREA_SQM: 'placeAreaSqM',
            MINIMUM_STAY_DAYS: 'minimumStayDays',
            MAX_STAY_DAYS: 'maxStayDays',
            LISTING_TYPE_ID: 'listingTypeId',
            IS_CHECKED: 'isChecked',
            CREATED_AT: 'createdAt',
            UPDATED_AT: 'updatedAt'
        };
    };

    static get jsonSchema() {

        return {
            type: 'object',
            required: [
                ListingsModel.Fields.USER_ID,
                ListingsModel.Fields.TITLE,
                ListingsModel.Fields.MONTHLY_RENT,
                ListingsModel.Fields.LISTING_TYPE_ID
            ],
            properties: {
                [ListingsModel.Fields.ID]: { type: 'string', maxLength: 21 },
                [ListingsModel.Fields.USER_ID]: { type: 'string', maxLength: 21 },
                [ListingsModel.Fields.TITLE]: { type: 'string', maxLength: 255 },
                [ListingsModel.Fields.MONTHLY_RENT]: { type: 'number', minimum: 0, multipleOf: 0.01 },
                [ListingsModel.Fields.CURRENCY_ID]: { type: 'number' },
                [ListingsModel.Fields.DESCRIPTION]: { type: 'string', maxLength: 1000 },
                [ListingsModel.Fields.BEDROOMS]: { type: 'integer', minimum: 0, maximum: 255 },
                [ListingsModel.Fields.BEDS]: { type: 'integer', minimum: 0, maximum: 255 },
                [ListingsModel.Fields.BATHROOMS]: { type: 'number', minimum: 0, maximum: 999.9, multipleOf: 0.1 },
                [ListingsModel.Fields.ROOM_AREA_SQM]: { type: 'number', minimum: 0, maximum: 9999.99, multipleOf: 0.01 },
                [ListingsModel.Fields.PLACE_AREA_SQM]: { type: 'number', minimum: 0, maximum: 9999.99, multipleOf: 0.01 },
                [ListingsModel.Fields.MINIMUM_STAY_DAYS]: { type: 'integer', minimum: 0 },
                [ListingsModel.Fields.MAX_STAY_DAYS]: { type: 'integer', minimum: 0 },
                [ListingsModel.Fields.LISTING_TYPE_ID]: { type: 'integer' },
                [ListingsModel.Fields.IS_CHECKED]: { type: 'boolean', default: false },
                [ListingsModel.Fields.CREATED_AT]: { type: 'string', format: 'date-time' },
                [ListingsModel.Fields.UPDATED_AT]: { type: 'string', format: 'date-time' }
            }
        };
    };

    $parseDatabaseJson(json){

        json = super.$parseDatabaseJson(json);

        json[ListingsModel.Fields.CREATED_AT] = moment(json[ListingsModel.Fields.CREATED_AT]).format('YYYY MMM DD');
        json[ListingsModel.Fields.UPDATED_AT] = moment(json[ListingsModel.Fields.UPDATED_AT]).format('YYYY MMM DD');
        
        return json;
    }

    static get relationMappings() {

        const lm = `${ListingsModel.tableName}.${ListingsModel.Fields.USER_ID}`;
        const u = `${UserModel.tableName}.${UserModel.Fields.ID}`;

        const x = `${ListingsModel.tableName}.${ListingsModel.Fields.CURRENCY_ID}`;
        const s = `${CurrencyModel.tableName}.${CurrencyModel.Fields.ID}`
    
        const z = `${ListingsModel.tableName}.${ListingsModel.Fields.LISTING_TYPE_ID}`;
        const zz = `${ListingTypeModel.tableName}.${ListingTypeModel.Fields.ID}`;

        const y = `${ListingsModel.tableName}.${ListingsModel.Fields.ID}`;
        const yy = `${HostModel.tableName}.${HostModel.Fields.LISTING_ID}`;

        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: lm,
                    to: u
                }
            },
            listingType: {
                relation: Model.BelongsToOneRelation,
                modelClass: ListingTypeModel,
                join: {
                    from: z,
                    to: zz
                }
            },
            currency: {
                relation: Model.BelongsToOneRelation,
                modelClass: CurrencyModel,
                join: {
                    from: x,
                    to: s
                }
            },
            address: {
                relation: Model.HasOneRelation,
                modelClass: () => require('./address/address.model'),
                join: {
                    from: 'Listing.id',
                    to: 'Address.listingId'
                }
            },
            hostingDetails: {
                relation: Model.BelongsToOneRelation,
                modelClass: HostModel,
                join: {
                    from: y,
                    to: yy
                }
            }
        }
    }

    
};

module.exports = ListingsModel;