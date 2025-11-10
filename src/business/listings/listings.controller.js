const { successResponse } = require("../../responses/responses");
const Utility = require("../../utility");
const ListingsRepository = require("./listings.repository");
const ListingService = require("./listings.service");

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */


/**
 * @param {Request} req
 * @param {Response} res
 */
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

        const { includes } = req.query;

        const includeOptions = ListingService.MapParamsToGraph(includes);

        const [ result ] = await ListingsRepository.repoGetListingDeets(listId, includeOptions);

        if(!result) return res.status(404)

        return res.status(200).json(result);
    }
    catch(error){

        console.error(error);

        return res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
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

/**
 * @param {Request} req
 * @param {Response} res
 */
async function httpCreateListing(req, res){  

    try {

        console.log('**creating listing**');

        const userId = req.user.id;

        const listingData = req.body;

        const { stepNum } = req.params;

        if(listingData.xxFormxx){

            const listing = await ListingsRepository.repoGetListingById(listingData.xxFormxx);

            console.log('** checking userId to listing **');

            if(listing.userId !== userId){
            
                console.warn('** user wasnt authorized **');
                
                return res.status(401).json({ message: 'Unauthorized to change this'})
            }

            delete listingData.xxFormxx;
        }
        else if(stepNum === 'step-11' && listingData?.files[0].xxFormxx){

            const listing = await ListingsRepository.repoGetListingById(listingData?.files[0].xxFormxx);

            if(listing.userId !== userId){
            
                return res.status(401).json({ 
                    message: 'Unauthorized to change this',
                    statusCode: 401,
                    success: false,
                })
            }

            delete listingData?.files[0].xxFormxx
        }
        else if(!listingData.xxFormxx && stepNum !== 'step-1'){
            return res.status(404).json({ 
                message: 'No listing id', 
                statusCode: 404,
                success: false
            });
        }

        let filepaths = [];

        if(req.files) filepaths = req.files.map(file => file.path);

        const model = ListingService.getModelFromFormStep(stepNum);

        if(!model) return res.status(404).json({ message: 'Not valid parameters' });

        const results = await ListingsRepository.repoCreateListing(listingData, model, filepaths);

        if(filepaths.length > 0){

            for(let path of filepaths){
                Utility.deleteFileFromFs(path);
            }
        }

        return successResponse(res, results, `Step: ${stepNum} successful`, 200)

    }
    catch(error){

        console.error(error);

        if(error.statusCode === 400){

            return res.status(400).json({
                error: error,
                statusCode: 400,
                success: false,
                message: 'Unknown error'
            })
        }

        return res.status(500).json(error);
    }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
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

/**
 * @param {Request} req
 * @param {Response} res
 */
async function httpDeleteById(req, res) {
    
    try {

        const { id, type, listingId } = req.params;
        
        const userId = req.user.id;

        const listing = await ListingsRepository.repoGetListingById(listingId);

        if(!listing) return res.status(404).json({ error: 'Not found'});

        if(listing.userId !== userId) return res.status(401).json({ error: 'Unauthorized' });

        const model = ListingService.getModelFromMap(type);

        if(!model) return res.status(404).json({ error: 'Not found'});

        const isDelete = await ListingsRepository.repoDeleteById(model, id);

        if(!isDelete) return res.status(400).json({ error: 'Unable to delete record' })

        return res.status(204);

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
    httpGetListingsByUserId,
    httpDeleteById
};

