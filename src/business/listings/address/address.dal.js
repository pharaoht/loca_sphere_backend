class AddressDal {

    constructor(){}



    fromDto(addressDto) {

        if(addressDto.length === 0) return [];

        return addressDto.map(address => {

            return {
                id: address.id,
                listingId: address.listingId,
                latitude: address.latitude,
                longitude: address.longitude,
                distance: address.distance,
                city: address.city,
                stateOrProvince: address.stateOrProvince,
                postalCode: address.postalCode,
                countryCode: address.countryCode,
                streetAddress: address.streetAddress,
                houseNumber: address.houseNumber,
                extraInfo: address.extraInfo,
                monthlyRent: Number(address.monthlyRent),
                currency: address.currency,
                title: address.title
            }
        })
    }
};

const addressDal = new AddressDal();

module.exports = addressDal;