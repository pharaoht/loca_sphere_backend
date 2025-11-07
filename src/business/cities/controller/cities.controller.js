const AxiosService = require('../../../services/axios/axios.service');

async function httpQueryCities(req, res, next){

    try {

        const request = req?.query;

        const location = request?.location;

        if(!location) return res.status(404).json('provide a location')

        const options = AxiosService.genRapidApiReqObj(location);

        const response = await AxiosService.externalRequest(options);

        return res.status(200).json(response.data)
    }
    catch(error){

        console.error(error.response.data.errors);

        return res.status(error.status).json({message: error.response.data.errors})
    }
};


module.exports = {
    httpQueryCities
}