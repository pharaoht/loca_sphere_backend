const AxiosService = require('../../../services/axios/axios.service');

async function httpQueryCities(req, res, next){

    try {

        const request = req?.query;

        const location = request?.location;

        if(!location) throw new Error('Please provide a location.');

        const options = AxiosService.genRapidApiReqObj(location);

        const response = await AxiosService.externalRequest(options);

        return res.status(200).json(response.data)
    }
    catch(error){

        console.error(error);

        return res.status(404).json({message: error.message})
    }
};


module.exports = {
    httpQueryCities
}