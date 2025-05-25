class BedroomAmenityDal {

    static fromDto(listing){

        if(listing.length === 0) return undefined;

        const amenities = new Map();

        listing.forEach(element => {
            
            if(!amenities.has(element.bedroomAmenityId)){

                amenities.set(element.bedroomAmenityId, element.bedroomAmenity);
            }
        });

        const dal = {
            listing: {
                id: listing[0].listing.id,
                beds: listing[0].listing.beds,
                isChecked: listing[0].listing.isChecked === 0 ? false : true,
                listingType: listing[0].listing.listingType.name,
                listingTypeId: listing[0].listing.listingTypeId
            },
            bedroomAmenities: Array.from(amenities.values()),
        }

        return dal;

    }
};

module.exports = BedroomAmenityDal