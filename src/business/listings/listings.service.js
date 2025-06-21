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
};

module.exports = ListingService;