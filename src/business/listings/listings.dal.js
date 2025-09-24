class ListingsDal {

    static keyMap = {
        'step-5': (data) => ListingsDal.bedroomAmenityDal(data.amenities),

    }

    static houseRulesDal(data){

        const insertIds = data.reduce((acc,itm) => {

            if(itm.id === undefined && itm.isAllowed){
                acc.push({
                    id: itm.id,
                    listingId: itm.listingId,
                    ruleId: itm.ruleId,
                    isAllowed: itm.isAllowed
                })
            }

            return acc
        }, []);

        return {
            insertIds
        }
    };


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