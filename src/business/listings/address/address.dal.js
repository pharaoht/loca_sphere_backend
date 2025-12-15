const AddressModel = require('./address.model');
const ListingsModel = require('../listings.model');
const CurrencyModel = require('../currency/currency.model');
const moment = require('moment');

class AddressDal {

    static fromDto(addressDto){

        if(addressDto.length === 0) return [];

        return addressDto.map(address => {

            return {
                [AddressModel.Fields.ID]: address[AddressModel.Fields.ID],
                [AddressModel.Fields.LISTING_ID]: address[AddressModel.Fields.LISTING_ID],
                [AddressModel.Fields.STREET_ADDRESS]: address[AddressModel.Fields.STREET_ADDRESS],
                [AddressModel.Fields.HOUSE_NUMBER]: address[AddressModel.Fields.HOUSE_NUMBER],
                [AddressModel.Fields.POSTAL_CODE]: address[AddressModel.Fields.POSTAL_CODE],
                [AddressModel.Fields.CITY]: address[AddressModel.Fields.CITY],
                [AddressModel.Fields.STATE_OR_PROVINCE]: address[AddressModel.Fields.STATE_OR_PROVINCE],
                [AddressModel.Fields.COUNTRY_CODE]: address[AddressModel.Fields.COUNTRY_CODE],
                [AddressModel.Fields.LATITUDE]: address[AddressModel.Fields.LATITUDE],
                [AddressModel.Fields.LONGITUDE]: address[AddressModel.Fields.LONGITUDE],
                [AddressModel.Fields.EXTRA_INFO]: address[AddressModel.Fields.EXTRA_INFO],
                listing: {
                    [ListingsModel.Fields.ID]: address[ListingsModel.Fields.ID],
                    [ListingsModel.Fields.USER_ID]: address[ListingsModel.Fields.USER_ID],
                    [ListingsModel.Fields.TITLE]: address[ListingsModel.Fields.TITLE],
                    [ListingsModel.Fields.MONTHLY_RENT]: Math.floor(address[ListingsModel.Fields.MONTHLY_RENT]),
                    [ListingsModel.Fields.CURRENCY_ID]: address[ListingsModel.Fields.CURRENCY_ID],
                    [ListingsModel.Fields.DESCRIPTION]: address[ListingsModel.Fields.DESCRIPTION],
                    [ListingsModel.Fields.BEDROOMS]: address[ListingsModel.Fields.BEDROOMS],
                    [ListingsModel.Fields.BEDS]: address[ListingsModel.Fields.BEDS],
                    [ListingsModel.Fields.BATHROOMS]: address[ListingsModel.Fields.BATHROOMS],
                    [ListingsModel.Fields.ROOM_AREA_SQM]: address[ListingsModel.Fields.ROOM_AREA_SQM],
                    [ListingsModel.Fields.PLACE_AREA_SQM]: address[ListingsModel.Fields.PLACE_AREA_SQM],
                    [ListingsModel.Fields.MINIMUM_STAY_DAYS]: address[ListingsModel.Fields.MINIMUM_STAY_DAYS],
                    [ListingsModel.Fields.MAX_STAY_DAYS]: address[ListingsModel.Fields.MAX_STAY_DAYS],
                    [ListingsModel.Fields.LISTING_TYPE_ID]: address[ListingsModel.Fields.LISTING_TYPE_ID],
                    [ListingsModel.Fields.PEOPLE_ALLOWED]: address[ListingsModel.Fields.PEOPLE_ALLOWED],
                    [ListingsModel.Fields.IS_CHECKED]: !address[ListingsModel.Fields.IS_CHECKED] ? false : true,
                    [ListingsModel.Fields.CREATED_AT]: address[ListingsModel.Fields.CREATED_AT],
                    [ListingsModel.Fields.UPDATED_AT]: address[ListingsModel.Fields.UPDATED_AT],
                    nextAvailableDate:{
                        tz: address.nextAvailableDate,
                        milliseconds: moment(address.nextAvailableDate).valueOf(),
                        yymmdd: moment(address.nextAvailableDate).format('YYYY MMM DD')
                    }, 
                    currency: {
                        [CurrencyModel.Fields.ID]: address[CurrencyModel.Fields.ID],
                        [CurrencyModel.Fields.CODE]: address[CurrencyModel.Fields.CODE],
                        [CurrencyModel.Fields.SYMBOL]: address[CurrencyModel.Fields.SYMBOL],

                    },
                    images: address.listing.images
                }
            }
        })

    }
};

module.exports = AddressDal;