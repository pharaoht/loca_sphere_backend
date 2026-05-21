const FavoritesModel = require("./favorites.model");

class FavoritesRepository {

    static async repoGetFavorites(userId = undefined){

        if(!userId) return [];

        const targetColumn = FavoritesModel.Fields.USER_ID;

        const favorites = await FavoritesModel.query()
            .where(targetColumn, userId)

        return favorites;

    }
}

module.exports = FavoritesRepository