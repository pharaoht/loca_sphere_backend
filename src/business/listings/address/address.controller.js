const AxiosService = require("../../../services/axios/axios.service");
const ListingService = require("../listings.service");
const AddressDal = require("./address.dal");
const AddressRepository = require("./address.repository");
const RedisCacheService = require('../../../services/cache/redis.cache');

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

        const santiParams = ListingService.santizeParams(req.query);

        const cacheKey = AddressDal.buildAddressCoorCacheKey({ lat, long, radius, santiParams });

        if(RedisCacheService.isConnected){

            const cacheData = await RedisCacheService.get(cacheKey);

            if(cacheData){
                return res.status(200).json(cacheData);
            }
        }

        const results = await AddressRepository.getAddressByCoordinatesRadius(lat, long, radius, santiParams);

        if (!results) return res.status(404).json({ error: 'Addresses not found' });

        const dal = AddressDal.fromDto(results);

        if(RedisCacheService.isConnected){

            await RedisCacheService.set(cacheKey, dal, { EX: 15 * 60 })
        }

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