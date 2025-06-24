const ListingsRepository = require("./listings.repository");
const ListingService = require("./listings.service");

async function httpDynamicGetListingDetails(req, res){

    /* 
        ?includes=,,,,

        Params:
        address,
        amenity,
        images,
        bedroomAmenity,
        host,
        hostRules,
        utility,
        currency,
        listingType

    */

    try {

        const { listId } = req.params;

        const { includes } = req.query

        const includeOptions = ListingService.MapParamsToGraph(includes);

        const [ result ] = await ListingsRepository.repoGetListingDeets(listId, includeOptions);

        return res.status(200).json(result);
    }
    catch(error){

        console.error(error);

        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    httpDynamicGetListingDetails
};

