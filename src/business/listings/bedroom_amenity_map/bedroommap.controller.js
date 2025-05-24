const BedroomAmenityRepository = require("./bedroommap.repository");

async function httpGetBedroomAmenityByListingId(req, res){

    try{

        const { listId } = req?.params;

        const results = await BedroomAmenityRepository.repoGetBedroomAmenityByListId(listId);

        if(!results) return res.status(404).json({ error: 'Bedroom Amenity not found' });

        return res.status(200).json(results);
    }
    catch(error){

        console.error(error);

        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    httpGetBedroomAmenityByListingId
}