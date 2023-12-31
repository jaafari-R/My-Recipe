const { RECIPE_API } = require("../../config").externalApiConfigs;
const { default: axios } = require("axios");

class RecipeFinderAPIManager {
    static async getRecipesByIngredient(ingredient) {
        return await axios.get(RECIPE_API + ingredient)
        .then((response) => {
            return response.data.results;
        });
    }
}

module.exports = RecipeFinderAPIManager;
