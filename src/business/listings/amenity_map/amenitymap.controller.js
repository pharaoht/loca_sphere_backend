const AmenityDal = require("./amenitymap.dal");
const AmenityMapRepository = require("./amenitymap.repository");

async function httpGetAmenityByListingId(req, res) {
    
    try{

        const { listId } = req.params;

        const results = await AmenityMapRepository.repoGetAmenityByListingId(listId);

        if(!results) {
            return res.status(404).json({ error: 'Amenity not found' });
        }

        const dal = AmenityDal.fromDto(results)
    
        return res.status(200).json(dal);
    
    }
    catch(error) {

        console.error(error);

        return res.status(500).json({ error: 'Internal server error' });
    }

};

module.exports = {
    httpGetAmenityByListingId
}