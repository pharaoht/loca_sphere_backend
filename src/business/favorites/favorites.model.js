const { Model } = require("objection");


class FavoritesModel extends Model {

    static get tableName(){
        return 'Favorites'
    }
    
    static get idColumn(){
        return 'id'
    }

    static get Fields(){

        return {
            ID: 'id',
            USER_ID:'userId',
            LISTING_ID:'listingId',
            NOTES:'notes',
            CREATED_AT: 'createdAt',
            UPDATED_AT:'updatedAt',
        }
    }

    static get jsonSchema(){

        return {
            type: 'object',
            require: [
                [FavoritesModel.Fields.USER_ID],
                [FavoritesModel.Fields.LISTING_ID]
            ],
            properties: {
                [FavoritesModel.Fields.ID]:  { type: 'integer' },
                [FavoritesModel.Fields.USER_ID]: { type: 'integer' },
                [FavoritesModel.Fields.LISTING_ID]: { type: 'integer' },
                [FavoritesModel.Fields.NOTES]: { type: ['string', 'null'], maxLength: 2000 },
                [FavoritesModel.Fields.CREATED_AT]: { type: 'string', format: 'date-time' },
                [FavoritesModel.Fields.UPDATED_AT]: { type: 'string', format: 'date-time' },
            }
        }
    }

    static get relationMappings(){

        const User = require('../users/users.model');
        const Listing = require('../listings/listings.model');

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: `${FavoritesModel.tableName}.${FavoritesModel.Fields.USER_ID}`,
                    to: `${User.tableName}.${User.Fields.ID}`
                }
            },
            listing: {
                relaton: Model.BelongsToOneRelation,
                modelClass: Listing,
                join: {
                    from: `${FavoritesModel.tableName}.${FavoritesModel.Fields.LISTING_ID}`,
                    to: `${Listing.tableName}.${Listing.Fields.ID}`
                }
            }
        }
    }
}

module.exports = FavoritesModel;