const BedroomAmenityMapModel = require('./bedroommap.model');

class BedroomAmenityRepository {

    static async repoGetBedroomAmenityByListId(listId){

        const result = await BedroomAmenityMapModel.query()
        .where(BedroomAmenityMapModel.Fields.LISTING_ID, listId)
        .withGraphFetched('bedroomAmenity')

        return result;

    }

}

module.exports = BedroomAmenityRepository;