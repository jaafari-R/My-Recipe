const { default: axios } = require("axios");

const { RECIPE_API } = require("../config").externalApiConfigs;

class Recipe {
    constructor(recipe) {
        this.title = recipe.title;
        this.ingredients = recipe.ingredients;
        this.imgUrl = recipe.thumbnail;
    }
}

class RecipeFinderAPIManager {
    async getRecipesForIngredient(ingredient) {
        return await axios.get(RECIPE_API + ingredient)
        .then((response) => {
            return response.data.results.map(recipe => new Recipe(recipe));
        });
    }
}

module.exports = new RecipeFinderAPIManager();