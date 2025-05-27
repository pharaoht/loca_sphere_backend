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

    async getListingById(listingId){

        const result = await ListingsModel.query()
        .where(ListingsModel.Fields.ID, listingId)
        .withGraphFetched('[listingType, currency, address]')
        .first();

        return result;
    }
};

const listingsRepository = new ListingsRepository();

module.exports = listingsRepository;