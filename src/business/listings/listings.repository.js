const ImagesModel = require('./images/images.model');
const ListingsModel = require('./listings.model');
const ListingService = require('./listings.service');

class ListingsRepository{

    static async repoGetListingDeets(listingId = '', options = '',){

        if(listingId === '') return false;
    
        const result = await ListingsModel.query()
            .where(ListingsModel.Fields.ID, listingId)
            .withGraphFetched(`[${options}]`)

        const nextAvail = await ListingService._computeNextAvailableDateForListing(result[0]);
   
        result[0]._nextAvailableDate = nextAvail;

        return result;
    }

    /**
     * @param {typeof import('objection').Model} model
    */
    static async repoGetOptions(model){

        const result = await model.query().select('*');
        
        return result;

    }

    /**
     * @param {typeof import('objection').Model} model
    */
    static async repoCreateListing(data = {}, model, filePath = ''){
     
        try{

            if(typeof model?.createRecord === 'function'){
                const updatedRecord = await model.createRecord(data, filePath);
                return updatedRecord;
            }

            if (!data.id) return await model.query().insert(data);
            
            const existing = await model.query().findById(data.id);

            if (existing) return await model.query().patchAndFetchById(data.id, data);

            else throw new Error(`Record with ID ${data.id} not found. Cannot Update`)
            
        }
        catch(error){

            console.error('repoCreateListing error:', error);

            throw error;
        }
    };


    static async repoGetListingById(listingId = undefined){

        if(!listingId) return false;

        const listing = await ListingsModel.query().findById(listingId);

        if(!listing) return false;

        const nextAvail = await ListingService._computeNextAvailableDateForListing(listing);
  
        listing._nextAvailableDate = nextAvail;

        return listing;
    }

    /**
     * @param {typeof import('objection').Model} model
    */
    static async repoDeleteById(model, id = '', listingId = ''){

        if(!id || !listingId) return false;

        const isDelete = await model.query()
        .delete()
        .where('id', id)
        .andWhere('listingId', listingId)

        if(model.tableName === ImagesModel.tableName){
            //delete image from cloudinary
        }

        return isDelete;
    }

};


module.exports = ListingsRepository;