const { errorResponse, successResponse } = require("../../responses/responses");
const FavoritesRepository = require("./favorites.repository");

async function httpGetFavorites(req, res) {

    try{

        const userId = req.user.id;

        const favorites = await FavoritesRepository.repoGetFavorites(userId);

        return successResponse(res, favorites, 'success', 200);
        
    }
    catch(error){

        console.error('Error fetching favorites:', error);
        
        return errorResponse(res, 'An error occurred while fetching favorites.', 500);
    }
};


module.exports = {
    httpGetFavorites
}