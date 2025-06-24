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

    static async repoGetListingDeets(listingId = '', options = '', filter = {}){

        if(listingId === '') return [];

        const result = await ListingsModel.query()
            .where(ListingsModel.Fields.ID, listingId)
            .withGraphFetched(`[${options}]`)
    
        return result;
        
    }

};


module.exports = ListingsRepository;