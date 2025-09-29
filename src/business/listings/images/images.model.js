const { Model } = require("objection");
const ImageUploadService = require("../../../services/upload/upload.service");

class ImagesModel extends Model {

    static get tableName(){
        return 'ListingPhotos'
    }

    static get idColumn(){
        return 'id'
    }

    static get Fields(){

        return {
            ID: 'id',
            LISTING_ID: 'listingId',
            URL: 'url',
            IS_PRIMARY: 'isPrimary',
            AMENITY_TYPE_ID: 'amenityTypeId',
            CREATED_AT: 'createdAt'
        }
    }

    static get jsonSchema() {

        return {
            type: 'object',
            required: [
                ImagesModel.Fields.LISTING_ID,
                ImagesModel.Fields.URL,
                ImagesModel.Fields.AMENITY_TYPE_ID,
            ],
            properties: {
                [ImagesModel.Fields.ID]: { type: 'integer' },
                [ImagesModel.Fields.LISTING_ID]: { type: 'string', minLength: 21, maxLength: 21 },
                [ImagesModel.Fields.URL]: { type: 'string', maxLength: 255 },
                [ImagesModel.Fields.IS_PRIMARY]: { type: 'boolean' },
                [ImagesModel.Fields.AMENITY_TYPE_ID]: { type: 'integer', minimum: 0, maximum: 255 },
                [ImagesModel.Fields.CREATED_AT]: { type: 'string', format: 'date-time' },
            }
        }
    }

    static get relationMappings(){
        
    }

    $parseDatabaseJson(json){

        json = super.$parseDatabaseJson(json);

        json[ImagesModel.Fields.IS_PRIMARY] = Boolean(+json[ImagesModel.Fields.IS_PRIMARY]);

        return json

    }

    static async createRecord(data = [], filePaths){

        let imageIds = [];
        const model = ImagesModel;

        //upload files to cloudinary
        for(let path of filePaths){

            const url = await ImageUploadService.uploadImage(path, 'listing_images');
        
            imageIds.push(url);
        }

        //save files to database
        for(let i = 0; i < data.files.length; i++){

            const file = data.files[i];
        
            const itm = {
                [model.Fields.URL]: imageIds[i].url,
                [model.Fields.LISTING_ID]: file.listingId,
                [model.Fields.IS_PRIMARY]: Boolean(+file.isPrimary),
                [model.Fields.AMENITY_TYPE_ID]: +file.tag
            };
           
            await model.query().insert(itm);
        }
    
    }
};

module.exports = ImagesModel;