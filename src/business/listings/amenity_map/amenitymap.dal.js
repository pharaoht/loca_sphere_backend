class AmenityDal {

    static fromDto(arr){

        if(!arr || arr.length === 0) return [];

        const listingAmenities = new Map();
        const listingFixures = new Map();

        arr.forEach(itm => {

            if(!listingAmenities.has(itm.listingAmenityMap.id)){
                listingAmenities.set(itm.listingAmenityMap.id, {
                    id: itm.listingAmenityMap.id,
                    amenityName: itm.listingAmenityMap.amenityName,
                    amenityTypeId:itm.amenityTypeId,
                    location: itm.amenityTypeMap.name,
                    roomNumber: itm.roomNumber
                })
            }
            if(!listingFixures.has(itm.amenityTypeMap.id)){
                listingFixures.set(itm.amenityTypeMap.id, itm.amenityTypeMap)
            }
        });
        
        return {
            id: arr[0].id,
            listingId: arr[0].listingId,
            roomNumber: arr[0].roomNumber,
            amenityId: arr[0].amenityId,
            listingAmenities: Array.from(listingAmenities.values()),
            fixures: Array.from(listingFixures.values())
        }

    }
};

module.exports = AmenityDal;