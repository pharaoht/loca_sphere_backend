require('dotenv').config();

class HttpService {

    static genMapboxApiReqObj(query = '', type = 'suggest') {

        if (query === '' || type === '') return '';

        const url =
            type === 'retrieve'
                ? `${type}/${query}?`
                : `${type}?q=${encodeURIComponent(query)}`;

        const params = new URLSearchParams({
            access_token: process.env.MAPBOX_ACCESS_TOKEN,
            session_token: process.env.MAPBOX_SESSION_TOKEN,
            types: 'address'
        });

        return `https://api.mapbox.com/search/searchbox/v1/${url}&${params.toString()}`;
    }

    static genRapidApiReqObj(cityName) {

        const params = new URLSearchParams({
            types: 'CITY',
            namePrefix: cityName,
            sort: '-population',
            countryIds:
                'AL,AD,AM,AT,AZ,BY,BE,BA,BG,HR,CY,CZ,DK,EE,FI,FR,GE,DE,GR,HU,IS,IE,IT,KZ,LV,LI,LT,LU,MT,MD,MC,ME,NL,MK,NO,PL,PT,RO,RU,SM,RS,SK,SI,ES,SE,CH,TR,UA,GB,VA,US'
        });

        return {
            url: `https://${process.env.RAPID_API_HOST}/v1/geo/cities?${params.toString()}`,
            options: {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': process.env.RAPID_API_KEY,
                    'x-rapidapi-host': process.env.RAPID_API_HOST
                }
            }
        };
    }

    static async externalRequest(request) {

        console.log('making external request...');

        const url = typeof request === 'string'
            ? request
            : request.url;

        const options = typeof request === 'string'
            ? {}
            : request.options;

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }

        return await response.json();
    }
};

module.exports = HttpService;