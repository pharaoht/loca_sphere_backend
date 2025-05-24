const db = require('../../../database/db.connection');
const AddressModel = require('./address.model');
const ListingsModel = require('../listings.model');
const CurrencyModel = require('../currency/currency.model');

class AddressRepository {

    static async getAddresById(listingId){

        const results = await AddressModel.query()
        .where(AddressModel.Fields.LISTING_ID, listingId)
        .withGraphFetched('listing.currency')
        .first();

        return results;
    }

    static async getAddressByCoordinatesRadius(latitude, longitude, radius = 15 * 1.60934){

        const results = await AddressModel.query()
            .alias('a')
            .joinRelated('listing as l')
            .joinRaw('JOIN "Currencies" as c ON c.id = l.currencyId')
            .select(
                'a.*',
                `l.${ListingsModel.Fields.USER_ID}`,
                `l.${ListingsModel.Fields.TITLE}`,
                `l.${ListingsModel.Fields.MONTHLY_RENT}`,
                `l.${ListingsModel.Fields.CURRENCY_ID}`,
                `l.${ListingsModel.Fields.DESCRIPTION}`,
                `l.${ListingsModel.Fields.BEDROOMS}`,
                `l.${ListingsModel.Fields.BEDS}`,
                `l.${ListingsModel.Fields.BATHROOMS}`,
                `l.${ListingsModel.Fields.ROOM_AREA_SQM}`,
                `l.${ListingsModel.Fields.MINIMUM_STAY_DAYS}`,
                `l.${ListingsModel.Fields.MAX_STAY_DAYS}`,
                `l.${ListingsModel.Fields.LISTING_TYPE_ID}`,
                `l.${ListingsModel.Fields.IS_CHECKED}`,
                `l.${ListingsModel.Fields.CREATED_AT}`,
                `l.${ListingsModel.Fields.UPDATED_AT}`,
                `c.${CurrencyModel.Fields.SYMBOL}`,
                `c.${CurrencyModel.Fields.CODE}`,
                `c.${CurrencyModel.Fields.CREATED_AT}`
            )
            .select(
                AddressModel.raw(`
                    (6371 * acos(
                        cos(radians(?)) * cos(radians(latitude)) *
                        cos(radians(longitude) - radians(?)) +
                        sin(radians(?)) * sin(radians(latitude))
                    )) AS distance
                    `, [latitude, longitude, latitude]
                )
            )
            .having('distance', '<', radius)
            .orderBy('distance')
            .limit(20);

        return results
    }


};

module.exports = AddressRepository