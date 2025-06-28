const { min } = require("moment");

class ListingService {

    static get ParamMap(){

        return {
            address: 'address',
            amenity: 'amenity.[listingAmenityMap, amenityTypeMap]',
            images: 'images',
            host: 'hostingDetails.genderMapping',
            utility: 'utilityMap',
            bedroomAmenity: 'bedroomAmenityMap.bedroomAmenity',
            currency: 'currency',
            listingType: 'listingType',
            hostRules: 'hostRulesMap.houseRules'

        }
    }

    static get FilterMap(){

        return {
            orderBy: ['distance', 'monthlyRent', ],
            direction: ['asc', 'desc'],
            bedrooms: Number,
            bathrooms: Number,
            peopleAllowed: Number,
            moveInDate: '',
            moveOutDate: '',
            placeType: '',
            landlord: '',
            suitableFor: '',
            minRent: Number,
            maxRent: Number,
            registrationStatus:'',
            bedroomAmenities: '',
            houseAmenities: '',
            verification: Boolean,

        }
    }

    static MapParamsToGraph(requestQuery = ''){

        if(requestQuery === '') return '';

        const graphFetchString = requestQuery.split(',').map(str => {

            const s = str.trim();

            if(s in ListingService.ParamMap){
                
                return ListingService.ParamMap[s]
            }

        }).filter(Boolean).toString();

        return graphFetchString;
    }

    static santizeParams(params = {}){

        const filterMap = ListingService.FilterMap;

        Object.entries(params).forEach(([key, value]) => {

            if(filterMap.hasOwnProperty(key)){
                
                if(Array.isArray(filterMap[key])){

                    if(!filterMap[key].includes(value)){
                        delete params[key];
                    }
                }
                if(typeof filterMap[key] === 'number'){
                    if(isNaN(Number(value))){
                        delete params[key];
                    } else {
                        params[key] = Number(value);
                    }
                }
                if(typeof filterMap[key] === 'boolean'){

                    if(value !== true && value !== false){
                        delete params[key];
                    }
                }

            }
            
        })

        return params

    }
};

module.exports = ListingService;