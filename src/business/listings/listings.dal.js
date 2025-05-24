const moment = require("moment");
const ListingsModel = require("./listings.model");

class ListingsDal {

    constructor(){

    }


    formatBedroomAmenities(bedroomAmenities) {

        if (!bedroomAmenities || bedroomAmenities.length === 0) {
            return [];
        };

        const [ listing ] = bedroomAmenities;

        return {
            listingId: listing.lid,
            title: listing.title,
            monthlyRent: listing.monthlyRent,
            currency: listing.currency,
            description: listing.description,
            bedrooms: listing.bedrooms,
            bathrooms: listing.bathrooms,
            listingType: listing.listingType,
            listingTypeId: listing.listingTypeId,
            areaSqm: listing.areaSqm,
            bedroomAmenities: bedroomAmenities.map(x => {
                return {
                    id: x.baId,
                    name: x.amenityName,
                    icon: x.icon,
                }
            })
        }
    }

    formatListingHostDetails(listing){

        if(listing.length < 1) return [];

        const dal = listing.map(itm => {

            return {
                id: itm.id,
                title: itm.title,
                monthlyRent: itm.monthlyRent,
                description: itm.description,
                livesInProperty: Boolean(itm.livesInProperty),
                hostAgeRange: itm.hostAgeRange,
                livesWithFamily: Boolean(itm.livesWithFamily),
                hasPets: Boolean(itm.hasPets),
                hostGender: itm.hostGender,
                isChecked: Boolean(itm.isChecked),
                sex: itm.sex,
                minimumStayDays: itm.minimumStayDays,
                maxStayDays: itm.maxStayDays,
                updatedAt: moment(itm.updatedAt).format('MMM YYYY')
            }
        });

        return dal;
    }

    formatListingUtilities(utilities){

        if(utilities.length === 0) return [];

        const x = {
            isWaterIncluded: false,
            isElecIncluded: false,
            isInternetIncluded: false,
            isGasIncluded: false,
            isAllincluded: false,
            isCleaningIncluded: false,
        }

        utilities.forEach(element => {
            
            if(element.name === 'Water') x.isWaterIncluded = true;
            if(element.name === 'Internet') x.isInternetIncluded = true;

        });


        return [x];
    }
};

const listingsDal = new ListingsDal();

module.exports = listingsDal;