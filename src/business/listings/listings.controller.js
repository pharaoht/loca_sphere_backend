const listingsDal = require("./listings.dal");
const listingsRepository = require("./listings.repository");

async function httpGetBedroomAdmenitiesByListingId(req, res){

    try {

        const { listId } = req.params;

        const results = await listingsRepository.getBedroomAmenitiesByListingId(listId);

        if(!results || results.length === 0){
            return res.status(404).json({ error: 'No bedroom amenities found for this listing.' });
        }

        const dal = listingsDal.formatBedroomAmenities(results);

        return res.status(200).json(dal);
    }
    catch(error){

        console.error(error);

        return res.status(500).json({ error: 'Internal server error' });
    }
};

async function httpGetListingHostDetails(req, res){

    try{

        const { listId } = req.params;

        const results = await listingsRepository.getListingsHostDetails(listId);

        if(!results || results.length < 1){
            return res.status(404).json({ error: 'No details found for this listing.' });
        } 

        const dal = listingsDal.formatListingHostDetails(results);

        return res.status(200).json(dal);

    }
    catch(error){

        console.error(error);

        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    httpGetBedroomAdmenitiesByListingId,
    httpGetListingHostDetails
};

