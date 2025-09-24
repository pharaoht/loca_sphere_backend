const AddressModel = require("./address/address.model");
const AmenityModel = require("./amenity/amenity.model");
const AmenityTypeModel = require("./amenity_type/amenitytype.model");
const BedroomAmenityModel = require("./bedroom_amenity/bedroom.model");
const CurrencyModel = require("./currency/currency.model");
const GenderModel = require("./gender/gender.model");
const HostModel = require("./host/host.model");
const { HouseRules, HouseRulesMap } = require("./house_rules/houseRules.model");
const ListingTypeModel = require("./listing_type/listingtype.model");
const ListingsModel = require("./listings.model");
const UtilityModel = require("./utility/utility.model");
const ListingBedroomAmenities = require('./bedroom_amenity_map/bedroommap.model');
const ImagesModel = require("./images/images.model");
const AmenityMapModel = require("./amenity_map/amenitymap.model");

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
            hostRules: 'hostRulesMap.houseRules',
        }
    }

    static get FormModelMap(){

        return {
            'step-1': ListingsModel,
            'step-2': AddressModel,
            'step-3': ListingsModel,
            'step-4': HostModel,
            'step-5': ListingBedroomAmenities,
            'step-6': AmenityMapModel,
            'step-7': UtilityModel,
            'step-8': HouseRulesMap,
            'step-9':'',
            'step-10':'',
            'step-11': ImagesModel,
        }
    }

    static get ModelMap(){

        return {
            amenity: AmenityModel,
            amenityType: AmenityTypeModel,
            utility: UtilityModel,
            bedroomAmenity: BedroomAmenityModel,
            currency: CurrencyModel,
            listingType: ListingTypeModel,
            houseRules: HouseRules,
            gender: GenderModel,
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

        if(requestQuery === 'all') return Object.values(ListingService.ParamMap).join(',').toString();

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

    static getModelFromFormStep(param = ''){
        if(!param) return undefined;

        if(!ListingService.FormModelMap.hasOwnProperty(param)) return undefined;

        return ListingService.FormModelMap[param];
    }

    static getModelFromMap(param = ''){
        
        if(!param) return undefined;

        if(!ListingService.ModelMap.hasOwnProperty(param)) return undefined;

        return ListingService.ModelMap[param];
    }
};

module.exports = ListingService;
