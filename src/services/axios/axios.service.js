const axios = require('axios');
require('dotenv').config();

class AxiosService {

    constructor(){

    }

    genRapidApiReqObj(cityName){

        const options = {
            method: 'GET',
            url: `https://${process.env.RAPID_API_HOST}/v1/geo/cities`,
            params: {
                types: 'CITY',
                namePrefix: cityName,
                sort: '-population',
                countryIds: 'AL,AD,AM,AT,AZ,BY,BE,BA,BG,HR,CY,CZ,DK,EE,FI,FR,GE,DE,GR,HU,IS,IE,IT,KZ,XK,LV,LI,LT,LU,MT,MD,MC,ME,NL,MK,NO,PL,PT,RO,RU,SM,RS,SK,SI,ES,SE,CH,TR,UA,GB,VA,US'
            },
            headers: {
              'x-rapidapi-key': process.env.RAPID_API_KEY,
              'x-rapidapi-host': process.env.RAPID_API_HOST
            }
        };

        return options
    }

    async externalRequest(options){

        try {

            console.log('making external request...');

            const response = await axios.request(options);
            
            if(response.status === 200) return response.data;

            else throw new Error(`Unexpected response status: ${response.status}`);

        } catch (error) {

            throw new Error(error.message)

        }
    }
};


const axiosService = new AxiosService();

module.exports = axiosService;