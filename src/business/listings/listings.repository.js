const ListingsModel = require('./listings.model');

class ListingsRepository{

    constructor(){}

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

    async repoGetListingById(listingId){

        const result = await ListingsModel.query()
        .where(ListingsModel.Fields.ID, listingId)
        .withGraphFetched('[listingType, currency, address]')
        .first();

        return result;
    }

    async repoGetHostingDetailsByListingId(listingId){

        const result = await ListingsModel.query()
        .where(ListingsModel.Fields.ID, listingId)
        .withGraphFetched('hostingDetails.genderMapping')
        .first();
        
        return result;
    }
};

const listingsRepository = new ListingsRepository();

module.exports = listingsRepository;