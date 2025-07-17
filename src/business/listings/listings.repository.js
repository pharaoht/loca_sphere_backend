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
    static async repoCreateListing(data = {}, model){

        try{
            if(data.insertIds){
                
                if(Array.isArray(data.deleteIds) && data.deleteIds.length > 0){
                    await model.query().delete().whereIn(model.Fields.ID, data.deleteIds);
                } 
                    
                for(const itm of data.insertIds){

                    const exists = await model.query().findOne(itm);

                    if(!exists) await model.query().insert(itm);
                    
                }
                
                return true;
            }

            if (!data.id) return await model.query().insert(data);

            const existing = await model.query().findById(data.id);

            if (existing) return await model.query().patchAndFetchById(data.id, data);

            else return await model.query().insert(data);
        
            
        }
        catch(error){

            console.error('repoCreateListing error:', error);

            throw error;
        }
    };

    static async repoCheckIfListingExist(listingID){

    }

    /**
     * @param {typeof import('objection').Model} model
    */
    static async repoUpdateListing(data = {}, model){
        
        const record = await model.query().patch(data);

        return [];
    }

};


module.exports = ListingsRepository;