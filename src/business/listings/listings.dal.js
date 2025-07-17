class ListingsDal {

    static keyMap = {
        'step-5': (data) => ListingsDal.bedroomAmenityDal(data)
    }


    static bedroomAmenityDal(data){

        const deleteIds = data.reduce((acc, itm) => {

            if(itm.id !== undefined && itm.toDelete){
                acc.push(itm.id)
            }

            return acc
        }, []);

        const insertIds = data.reduce((acc,itm) => {

            if(itm.id === undefined && !itm.toDelete){
                acc.push({
                    listingId: itm.listingId,
                    bedroomAmenityId: itm.bedroomAmenityId
                })
            }

            return acc
        }, []);

        return {
            deleteIds, insertIds
        }
    }
};

module.exports = ListingsDal;