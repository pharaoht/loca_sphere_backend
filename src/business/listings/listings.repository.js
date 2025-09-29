const ListingsModel = require('./listings.model');

class ListingsRepository{

    constructor(){}

    static async repoGetListingDeets(listingId = '', options = '',){

        if(listingId === '') return [];

        const result = await ListingsModel.query()
            .where(ListingsModel.Fields.ID, listingId)
            .withGraphFetched(`[${options}]`)
    
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

        return listing;
    }

};


module.exports = ListingsRepository;