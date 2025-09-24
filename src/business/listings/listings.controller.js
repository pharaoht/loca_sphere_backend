const Utility = require("../../utility");
const ListingsDal = require("./listings.dal");
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

async function httpGetListingOptions(req, res){

    try {

        const { option } = req.params;
 
        const model = ListingService.getModelFromMap(option);

        if(!model) return res.status(404).json({ error: 'Not valid parameters' });

        const results = await ListingsRepository.repoGetOptions(model);

        return res.status(200).json(results);

    }
    catch(error){

        console.error(error);

        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function httpCreateListing(req, res){

    try {

        let filepaths = [];

        if(req.files) filepaths = req.files.map(file => file.path);

        const listingData = req.body;

        const { stepNum } = req.params;

        const model = ListingService.getModelFromFormStep(stepNum);

        if(!model) return res.status(404).json({ error: 'Not valid parameters' });

        const results = await ListingsRepository.repoCreateListing(listingData, model, filepaths);

        if(filepaths.length > 0){

            for(let path of filepaths){
                Utility.deleteFileFromFs(path);
            }
        }

        return res.status(200).json({
            data: results,
            statusCode: 200,
            success: true
        });

    }
    catch(error){

        console.log(error);

        if(error.statusCode === 400){

            return res.status(400).json({
                error: error,
                statusCode: 400,
                success: false
            })
        }

        return res.status(500).json(error);
    }
}

async function httpGetListingsByUserId(req, res){

    try {

        const listingData = req.body;

        const model = ListingService.ModelMap(listingData.step);

        const listing = ListingsRepository.repoCreateListing(listingData, model);

    }
    catch(error){

        console.error(error);

        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    httpDynamicGetListingDetails,
    httpGetListingOptions,
    httpCreateListing,
    httpGetListingsByUserId
};

