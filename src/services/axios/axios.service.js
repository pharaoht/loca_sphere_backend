const axios = require('axios');
require('dotenv').config();

class AxiosService {

    static genMapboxApiReqObj(query = '', type = 'suggest'){
        //retrieve or suggest
        if(query === '' || type == '') return {};

        const url = type === 'retrieve' ? `${type}/${query}?` : `${type}?q=${query}`

        const options = {
            method: 'GET',
            url: `https://api.mapbox.com/search/searchbox/v1/${url}`,
            params: {
                access_token: process.env.MAPBOX_ACCESS_TOKEN,
                session_token: process.env.MAPBOX_SESSION_TOKEN,               
                types: 'address'
            }
        }

        return options;
    }

    static genRapidApiReqObj(cityName){

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

    static async externalRequest(options){

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

module.exports = AxiosService;