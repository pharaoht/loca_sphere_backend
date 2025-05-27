const listingsDal = require("./listings.dal");
const listingsRepository = require("./listings.repository");

async function httpGetListingById(req, res){

    try {

        const { listId } = req.params;

        const result = await listingsRepository.getListingById(listId);

        return res.status(200).json(result)
    }
    catch(error){

        console.error(error);

        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    httpGetListingById,
};

