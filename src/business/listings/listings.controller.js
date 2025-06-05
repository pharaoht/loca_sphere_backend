const listingsDal = require("./listings.dal");
const listingsRepository = require("./listings.repository");

async function httpGetListingById(req, res){

    try {

        const { listId } = req.params;

        const result = await listingsRepository.repoGetListingById(listId);

        if(result.length === 0){
            return res.status(404).json({ error: 'Listing not found' });
        }

        return res.status(200).json(result)
    }
    catch(error){

        console.error(error);

        return res.status(500).json({ error: 'Internal server error' });
    }
};

async function httpGetHostDetailsByListingId(req, res){

    try{

        const { listId } = req.params;

        const result = await listingsRepository.repoGetHostingDetailsByListingId(listId);

        if(result.length === 0){
            return res.status(404).json({ error: 'Listing not found' });
        }

        return res.status(200).json(result);
    }
    catch(error){

        console.error(error);

        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    httpGetListingById,
    httpGetHostDetailsByListingId
};

