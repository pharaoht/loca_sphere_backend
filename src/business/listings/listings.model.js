const moment = require('moment');
const { Model } = require('objection');
const Utility = require('../../utility');
const HostModel = require('./host/host.model');
const UserModel = require('../users/users.model');
const ImagesModel = require('./images/images.model');
const UtilityModel = require('./utility/utility.model');
const BookingModel = require('../booking/booking.model');
const CurrencyModel = require('./currency/currency.model');
const AmenityMapModel = require('./amenity_map/amenitymap.model');
const { HouseRulesMap } = require('./house_rules/houseRules.model');
const ListingTypeModel = require('./listing_type/listingtype.model');
const BedroomAmenityMapModel = require('./bedroom_amenity_map/bedroommap.model');

const nanoid = async () => {
  const { nanoid } = await import('nanoid');
  return nanoid(19);
};

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
            PEOPLE_ALLOWED: 'peopleAllowed',
            IS_CHECKED: 'isChecked',
            IS_ACTIVE: 'isActive',
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
                ListingsModel.Fields.LISTING_TYPE_ID,
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
                [ListingsModel.Fields.BATHROOMS]: { type: 'string', minimum: 0, maximum: 999.9, multipleOf: 0.1 },
                [ListingsModel.Fields.ROOM_AREA_SQM]: { type: 'number', minimum: 0, maximum: 9999.99, multipleOf: 0.01 },
                [ListingsModel.Fields.PLACE_AREA_SQM]: { type: 'number', minimum: 0, maximum: 9999.99, multipleOf: 0.01 },
                [ListingsModel.Fields.MINIMUM_STAY_DAYS]: { type: 'integer', minimum: 0 },
                [ListingsModel.Fields.MAX_STAY_DAYS]: { type: 'integer', minimum: 0 },
                [ListingsModel.Fields.LISTING_TYPE_ID]: { type: 'integer' },
                [ListingsModel.Fields.PEOPLE_ALLOWED]: { type: 'integer', minimum: 1, maximum: 255 },
                [ListingsModel.Fields.IS_CHECKED]: { type: 'boolean', default: false },
                [ListingsModel.Fields.IS_ACTIVE]: { type: 'boolean', default: false },
                [ListingsModel.Fields.CREATED_AT]: { type: 'string', format: 'date-time' },
                [ListingsModel.Fields.UPDATED_AT]: { type: 'string', format: 'date-time' }
            }
        };
    };

    $parseDatabaseJson(json){

        json = super.$parseDatabaseJson(json);

        json[ListingsModel.Fields.CREATED_AT] = moment(json[ListingsModel.Fields.CREATED_AT]).format('YYYY MMM DD');
        json[ListingsModel.Fields.UPDATED_AT] = moment(json[ListingsModel.Fields.UPDATED_AT]).format('YYYY MMM DD');
        json[ListingsModel.Fields.ROOM_AREA_SQM] = parseFloat(json[ListingsModel.Fields.ROOM_AREA_SQM]);
        json[ListingsModel.Fields.PLACE_AREA_SQM] = parseFloat(json[ListingsModel.Fields.PLACE_AREA_SQM]);
        json[ListingsModel.Fields.IS_CHECKED] = !json[ListingsModel.Fields.IS_CHECKED] ? false : true;
        json[ListingsModel.Fields.IS_ACTIVE] = !json[ListingsModel.Fields.IS_ACTIVE] ? false : true;
        json[ListingsModel.Fields.MONTHLY_RENT] = parseFloat(json[ListingsModel.Fields.MONTHLY_RENT]);

        return json;
    }

    $formatJson(json) {
    
        const formattedJson = super.$formatJson(json);

        if(formattedJson.hasOwnProperty('amenity') && formattedJson.amenity != null){

            const uniqueAmenityTypes = [];

            formattedJson.amenity.forEach(amenity => {
                const id = amenity.amenityTypeMap.id;
                const value = amenity.amenityTypeMap.name;
                if(!uniqueAmenityTypes.some(itm => itm.id === id)){
                    uniqueAmenityTypes.push({
                        id: id,
                        name: value
                    })
                }
            });

            formattedJson.amenity = {
                amenityTypes: uniqueAmenityTypes,
                amenities: formattedJson.amenity
            }
        }

        if(formattedJson.hasOwnProperty('utilityMap') && formattedJson.utilityMap != null) {

            formattedJson.utilityMap.securityDeposit = Math.floor(Utility.calculateSecurityDeposit(formattedJson.monthlyRent));

            if( ( formattedJson.utilityMap.waterIncluded ) &&
                ( formattedJson.utilityMap.electricIncluded ) &&
                ( formattedJson.utilityMap.gasIncluded ) &&
                ( formattedJson.utilityMap.internetIncluded )
            ) {
                formattedJson.utilityMap.areBillsIncluded = true;        
            }
            else formattedJson.utilityMap.areBillsIncluded = false;

            if(formattedJson.hasOwnProperty('currency')) {
                formattedJson.utilityMap.currency = formattedJson.currency.symbol;
            }
        }
        
        return formattedJson;
    }

    async $beforeInsert(queryContext) {

        await super.$beforeInsert(queryContext);
        
        this[ListingsModel.Fields.ID] = `ls${await nanoid()}`;

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

        const ee = `${UtilityModel.tableName}.${UtilityModel.Fields.LISTING_ID}`;

        const qq = `${BedroomAmenityMapModel.tableName}.${BedroomAmenityMapModel.Fields.LISTING_ID}`;

        const rr = `${HouseRulesMap.tableName}.${HouseRulesMap.Fields.LISTING_ID}`;

        const d = `${AmenityMapModel.tableName}.${AmenityMapModel.Fields.LISTING_ID}`;

        const q = `${ImagesModel.tableName}.${ImagesModel.Fields.LISTING_ID}`;

        const v = `${BookingModel.tableName}.${BookingModel.Fields.LISTING_ID}`
       
        //add booking relation
        return {
            users: {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: lm,
                    to: u
                }
            },
            listingType: {
                relation: Model.HasOneRelation,
                modelClass: ListingTypeModel,
                join: {
                    from: z,
                    to: zz
                }
            },
            currency: {
                relation: Model.HasOneRelation,
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
                relation: Model.HasOneRelation,
                modelClass: HostModel,
                join: {
                    from: y,
                    to: yy
                }
            },
            utilityMap: {
                relation: Model.HasOneRelation,
                modelClass: UtilityModel,
                join: {
                    from: y,
                    to: ee
                }
            },
            bedroomAmenityMap: {
                relation: Model.HasManyRelation,
                modelClass: BedroomAmenityMapModel,
                join: {
                    from: y,
                    to: qq
                }
            },
            hostRulesMap: {
                relation: Model.HasManyRelation,
                modelClass: HouseRulesMap,
                join: {
                    from: y,
                    to: rr,
                }
            },
            amenity: {
                relation: Model.HasManyRelation,
                modelClass: AmenityMapModel,
                join: {
                    from: y,
                    to: d
                }
            },
            images: {
                relation: Model.HasManyRelation,
                modelClass: ImagesModel,
                join: { 
                    from: y,
                    to: q
                }
            },
            bookings: {
                relation: Model.HasManyRelation,
                modelClass: BookingModel,
                join: {
                    from: y,
                    to: v
                }
            }
        }
    }

    
};

module.exports = ListingsModel;