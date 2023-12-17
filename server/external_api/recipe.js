const { default: axios } = require("axios");

const { RECIPE_API } = require("../config").externalApiConfigs;

class Recipe {
    constructor() {

    }
}

class RecipeFinderAPIManager {
    async getRecipesThatHaveIngredient(ingredient) {
        return await axios.get(RECIPE_API + ingredient)
        .then((response) => {
            return response.data.results;//.map(recipe => new Recipe(recipe));
        });
    }
}

const rfam = new RecipeFinderAPIManager();
rfam.getRecipesThatHaveIngredient("tomato");