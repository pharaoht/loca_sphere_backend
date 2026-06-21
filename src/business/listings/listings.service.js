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
const BookingModel = require("../booking/booking.model");
const moment = require('moment');
const ListingRepository = require("./listings.repository");
const BookingRepository = require("../booking/booking.repository");

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
            images: ImagesModel
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

        if(!Object.hasOwn(ListingService.ModelMap, param)) return undefined;

        return ListingService.ModelMap[param];
    }

    static _isDateInPast(date){
                    
        const today = moment().startOf('day');
        const inputDate = moment(date).startOf('day');
        return inputDate.isBefore(today);
    }

    static async _computeNextAvailableDateForMultipleListings(listings) {
        
        if(!Array.isArray(listings) || listings.length == 0) return []

        const listingIds = listings.map((itm, idx) => itm[ListingsModel.Fields.ID]);

        const bookingObjArr = await BookingRepository.repoGetRelevantBookingsByListingIds(listingIds);

        const reduceArr = combineBookings(bookingObjArr);

        const updatedListings = computeDateAvailability(reduceArr, listings);

        return updatedListings;

        function combineBookings(bookings){

            return bookings.reduce((accumulator, currentValue) => {
                
                const listingId = currentValue[BookingModel.Fields.LISTING_ID];

                accumulator[listingId] = accumulator[listingId] || [];

                accumulator[listingId].push(currentValue)

                return accumulator;
            }, {});
        };

        function computeDateAvailability(bookings, listingsArr){

            const updatedListings = listingsArr.map((itm, idx) => {
                
                const listing = itm.listing;
                const minimumStayDays = listing[ListingsModel.Fields.MINIMUM_STAY_DAYS];
                const listingId = listing[ListingsModel.Fields.ID];
                const bookingsForListing = bookings[listingId];
                const tomorrow = moment().startOf('day').add(1, 'days');

                //if there are no bookings for the listing, the next available date is tomorrow
                if(!bookingsForListing){
                    listing._nextAvailableDate = tomorrow;
                    return itm;
                } 

                for(let i = 0; i < bookingsForListing.length; i++) {

                    const book = bookingsForListing[i];
                    const bookingEndDate = book[BookingModel.Fields.END_DATE];
                    const nextBooking = bookingsForListing[i + 1];
  
                    //if there is no next booking, we assume the next available date 
                    if(!nextBooking) {

                        const baseDate = ListingService._isDateInPast(bookingEndDate) ?
                            tomorrow
                        :
                            moment(bookingEndDate)
                            .clone()
                            .startOf('day')
                            .add(1, 'days');

                        listing._nextAvailableDate = baseDate;
                       
                        return itm;
                    }

                    const nextBookingStartDate = nextBooking[BookingModel.Fields.START_DATE];
                    const nextAvailableDate = computationsOfDates(bookingEndDate, nextBookingStartDate, minimumStayDays);

                    if(nextAvailableDate){
                        
                        listing._nextAvailableDate = nextAvailableDate;
                        return itm;
                    }
                }
   
                return itm;
            });

            return updatedListings;

            function computationsOfDates(endDateOfFirstBooking, startDateOfNextBooking, minimumStay){

                if(!endDateOfFirstBooking || !startDateOfNextBooking || !minimumStay || isNaN(minimumStay)) return null;

                const formatEndDate = moment(endDateOfFirstBooking).clone().startOf('day');
                const formatStartDate = moment(startDateOfNextBooking).clone().startOf('day');

                const gapDays = formatStartDate.diff(formatEndDate,'days');
                
                if(gapDays >= Number(minimumStay)){
                    return formatEndDate.add(1, 'days')
                }

                return null;
            };
        }
    }

    static async _computeNextAvailableDateForListing(listing) {
    
        const minimumStayForListing = listing[ListingsModel.Fields.MINIMUM_STAY_DAYS];

        const bookingObjArr = await BookingRepository.repoGetRelevantBookingsByListingId(listing[ListingsModel.Fields.ID]);

        const tomorrow = moment().startOf('day').add(1, 'days');

        if(bookingObjArr.length === 0) return tomorrow;

        const availableDate = findNextAvailableDate(bookingObjArr, minimumStayForListing);

        return availableDate ?? tomorrow;

        function findNextAvailableDate(bookingsForListing, minimumStay){

            for(let i = 0; i < bookingsForListing.length; i++) {

                const bookingEndDate = moment(bookingsForListing[i][BookingModel.Fields.END_DATE]);
                const theDayAfterBookingEndDate = bookingEndDate.clone().startOf('day').add(1, 'days');
                const nextBooking = bookingsForListing[i + 1];

                if(!nextBooking){

                    if(ListingService._isDateInPast(bookingEndDate)){
                        return tomorrow;
                    }

                    return theDayAfterBookingEndDate;
                } 
                
                const nextBookingStartDate = moment(nextBooking[BookingModel.Fields.START_DATE]);
                
                const gapDays = nextBookingStartDate         
                    .clone()
                    .startOf('day')
                    .diff(
                        bookingEndDate.clone().startOf('day'),
                        'days'
                    );

                if(gapDays >= minimumStay) return theDayAfterBookingEndDate;
            }
        }
    }
    
};

module.exports = ListingService;
