const db = require('../../../database/db.connection');
const AddressModel = require('./address.model');
const ListingsModel = require('../listings.model');
const CurrencyModel = require('../currency/currency.model');
const HostModel = require('../host/host.model');
const AmenityMapModel = require('../amenity_map/amenitymap.model');
const UtilityModel = require('../utility/utility.model');

class AddressRepository {

    static async getAddresById(listingId){

        const results = await AddressModel.query()
        .where(AddressModel.Fields.LISTING_ID, listingId)
        .withGraphFetched('listing.currency')
        .first();

        return results;
    }

    static async getAddressByCoordinatesRadius(latitude = 0.0, longitude = 0.0, radius = 15 * 1.60934, filters = {}){

        const cteQuery = ListingsModel.query()
            .select('id')
            .modify(qb => {

                if (filters.amenities) {
                    const amenityIds = String(filters.amenities).split(',').map(id => !isNaN(parseInt(id.trim(), 10)));
                    qb.whereExists(
                        ListingsModel.relatedQuery('amenity')
                        .whereIn('amenityId', amenityIds)
                    );
                }

            });

        const cteQueryTwo = ListingsModel.query()
            .select('id')
            .modify(qb => {

                if(filters.brAmenities){
                    const brAmenities = String(filters.brAmenities).split(',').map(id => !isNaN(parseInt(id.trim(), 10)));
                    qb.whereExists(ListingsModel.relatedQuery('bedroomAmenityMap')
                        .whereIn('bedroomAmenityId', brAmenities))
                }
            })


        const results = await AddressModel.query()
            .with('filtered_listings', cteQuery) 
            .with('filtered_listings_two', cteQueryTwo)
            .alias('a')
            .withGraphFetched('listing.images')
            .joinRelated('listing as l')
            .joinRaw('JOIN "Currencies" as c ON c.id = l.currencyId')
            .joinRaw('JOIN "ListingHostInfo" as h ON h.listingId = l.id')
            .joinRaw('JOIN "Utility" as u ON u.listingId = l.id')
            .whereIn('l.id', AddressModel.raw('SELECT id FROM filtered_listings')) 
            .whereIn('l.id', AddressModel.raw('SELECT id FROM filtered_listings_two'))
            .select(
                'a.*',
                `l.${ListingsModel.Fields.ID}`,
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
                `l.${ListingsModel.Fields.PEOPLE_ALLOWED}`,
                `c.${CurrencyModel.Fields.SYMBOL}`,
                `c.${CurrencyModel.Fields.CODE}`,
                `h.${HostModel.Fields.LIVES_IN_PROP}`,
                `h.${HostModel.Fields.IS_VERIFIED}`,
                `h.${HostModel.Fields.GENDER_ALLOWED_ID}`,
                `u.${UtilityModel.Fields.WATER_INCLUDED}`,
                `u.${UtilityModel.Fields.ELECTRIC_INCLUDED}`,
                `u.${UtilityModel.Fields.GAS_INCLUDED}`,
                `u.${UtilityModel.Fields.INTERNET_INCLUDED}`
                // `amenity.${AmenityMapModel.Fields.AMENITY_ID}`,
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
            .select(
                AddressModel.raw(`
                    CASE
                    WHEN EXISTS (
                        SELECT 1
                        FROM Bookings b
                        WHERE b.listingId = l.id
                        AND b.startDate <= CURRENT_DATE
                        AND b.endDate >= CURRENT_DATE
                    )
                    THEN (
                        SELECT DATE_ADD(MIN(b2.endDate), INTERVAL 1 DAY)
                        FROM Bookings b2
                        WHERE b2.listingId = l.id
                        AND b2.startDate <= CURRENT_DATE
                        AND b2.endDate >= CURRENT_DATE
                    )
                    ELSE CURRENT_DATE
                    END AS nextAvailableDate
                `)
            )
            .modify((builder) => {
                if(filters.minRent && !isNaN(Number(filters.minRent))) {
                    builder.where(`l.${ListingsModel.Fields.MONTHLY_RENT}`, '>=', filters.minRent)
                }
                if (filters.maxRent && !isNaN(Number(filters.maxRent))) {
			        builder.where(`l.${ListingsModel.Fields.MONTHLY_RENT}`, '<=', filters.maxRent);
		        }
                if(filters.bedrooms && !isNaN(Number(filters.bedrooms))) {
                    builder.where(`l.${ListingsModel.Fields.BEDROOMS}`, '=', filters.bedrooms)
                }
                if(filters.bathrooms && !isNaN(Number(filters.bathrooms))) {
                    builder.where(`l.${ListingsModel.Fields.BATHROOMS}`, '=', filters.bathrooms)
                }
                if(filters.listingType){

                    const opts = String(filters.listingType).split(',').map(t => !isNaN(t) && t.trim());

                    builder.whereIn(`l.${ListingsModel.Fields.LISTING_TYPE_ID}`, opts)
                }
                if(filters.isVerified && typeof filters.isVerified === 'boolean') {

                    builder.where(`l.${ListingsModel.Fields.IS_CHECKED}`, '=', filters.isVerified)
                }
                if(filters.peopleAllowed){
                    builder.where(`l.${ListingsModel.Fields.PEOPLE_ALLOWED}`, '>=', filters.peopleAllowed)
                }
                if(filters.suitablefor){

                    const opts = String(filters.suitablefor).split(',').map(t => !isNaN(t) && t.trim());

                }
                if (filters.moveIn && filters.moveOut) {
                    builder.whereNotExists(
                        AddressModel.raw(`
                            SELECT 1
                            FROM "Bookings" b
                            WHERE b."listingId" = l.id
                            AND b."startDate" <= ?
                            AND b."endDate" >= ?
                        `, [filters.moveIn, filters.moveOut])
                    );
                }


            })
            .having('distance', '<', radius)
            .orderBy(filters.orderBy || 'distance', filters.direction || 'asc')
            .limit(filters.limit || 25);
    
        return results
    }


};

module.exports = AddressRepository