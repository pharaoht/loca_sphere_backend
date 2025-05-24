const db = require('../../database/db.connection');
const ListingsModel = require('./listings.model');
const listingsModel = require('./listings.model');

class ListingsRepository{

    constructor(){
  
        this._tableName = 'Listing';
        this._listingsMapTable = 'ListingBedroomAmenities';
        this._bedroomAmenitiesTable = 'BedroomAmenities';
        this._listingTypesTable = 'ListingTypes';
        this._listingHostTable = 'ListingHostInfo';
        this._genderTable = 'Gender';
        this._listingUtilTable = 'ListingUtilities';
        this._UtilitiesTable = 'Utilities'

    }

    async getAllListings({
        page = 1,
        limit = 20,
        latitude = null,
        longitude = null,
        radius = null,
        moveInDate = null,
        moveOutDate = null,
        orderBy = null,
        placeType = {},
        landlord = {},
        suitableFor = {},
        priceRange = {},
        registrationStatus = null,
        typology = {},
        bedroomAmenities = {},
        houseAmenities = {},
        verification = {}
    }) {

    }

    async getBedroomAmenitiesByListingId(listingId) {

        const query = `
            SELECT 
                *,
                l.id AS listId,
                lba.id AS lbaId,
                ba.id AS baId,
                ba.name AS amenityName,
                lt.name AS listingType,
                lt.id AS listingTypeId
            FROM ${this._tableName} AS l
            INNER JOIN ${this._listingsMapTable} AS lba
                ON lba.listingId = l.id
            INNER JOIN ${this._bedroomAmenitiesTable} AS ba
                ON lba.id = ba.id
            INNER JOIN ${this._listingTypesTable} as lt
				ON l.listingTypeId = lt.id
            WHERE l.id = ?
        `;

        const [results] = await db.execute(query, [listingId]);

        return results;
    }

    async getListingsHostDetails(listingId){

        const query = `
            SELECT *,
                l.id as listingId,
				lhi.id as hostingId,
                g.id as genderId
            FROM ${this._tableName} l
            INNER JOIN ${this._listingHostTable} lhi
                ON lhi.listingId = l.id
            INNER JOIN ${this._genderTable} g
				ON g.id = genderAllowedId
            WHERE l.id = ?
        `;

        const [ result ] = await db.execute(query, [listingId]);

        return result;
    }

    async getListingUtilities(listingId){

        const query = `
            SELECT *
            FROM ${this._listingUtilTable} lu
            INNER JOIN ${this._UtilitiesTable} u
                ON u.id = lu.utilityId
            WHERE listingId = ?
        `;

        const [ result ] = await db.execute(query, listingId);

        return result;
    }

    async getListingById(listingId){

        const result = await ListingsModel.query()
        .where(ListingsModel.Fields.ID, listingId)
        .withGraphFetched('[listingType, currency]')
        .first();

        return result;
    }
};

const listingsRepository = new ListingsRepository();

module.exports = listingsRepository;