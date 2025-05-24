const AmenityMapModel = require("./amenitymap.model");

class AmenityMapRepository {

    static async repoGetAmenityByListingId(listId){
        
        const results = await AmenityMapModel.query()
        .where(AmenityMapModel.Fields.LISTING_ID, listId)
        .withGraphFetched('[listingAmenityMap, amenityTypeMap]')

        return results
    }

    static async repoGetAmenityTypesByListId(listId){
        
    }
};

module.exports = AmenityMapRepository