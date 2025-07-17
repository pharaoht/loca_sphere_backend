const AxiosService = require("../../../services/axios/axios.service");
const ListingService = require("../listings.service");
const AddressDal = require("./address.dal");
const AddressRepository = require("./address.repository");

async function httpgetAddressById(req, res) {

    try {

        const { id } = req?.params;

        const address = await AddressRepository.getAddresById(id);
    
        if (!address) {   
                
            return res.status(404).json({ error: 'Address not found' });
        }
    
        return res.status(200).json(address);
    }
    catch(error) {

        console.error(error);

        return res.status(500).json({ error: 'Internal server error' });
    }

};

async function httpgetAddressesByCoordinatesRadius(req, res) {

    try {
        
        const { lat, long, radius } = req?.query;

        //sanitize parameters
        const santiParams = ListingService.santizeParams(req.query);

        const results = await AddressRepository.getAddressByCoordinatesRadius(lat, long, radius, santiParams);

        if (!results) return res.status(404).json({ error: 'Addresses not found' });

        const dal = AddressDal.fromDto(results);
 
        return res.status(200).json(dal);

    } 
    catch(error) {

        console.error(error);

        return res.status(500).json({ error: 'Internal server error' });
    }
};

async function httpGeoCodingSearch(req, res){

    try {

        const { q, type } = req?.query;

        const options = await AxiosService.genMapboxApiReqObj(q, type)

        const response = await AxiosService.externalRequest(options);        
       
        return res.status(200).json(response);
    }
    catch(error) {

        console.error(error);

        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    httpgetAddressById,
    httpgetAddressesByCoordinatesRadius,
    httpGeoCodingSearch,
};