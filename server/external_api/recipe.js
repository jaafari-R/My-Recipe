const { default: axios } = require("axios");
const { RECIPE_API } = require("../config").externalApiConfigs;
const { foodFilters } = require("../config")

class Recipe {
    constructor(recipe) {
        this.title = recipe.title;
        this.ingredients = recipe.ingredients;
        this.imgUrl = recipe.thumbnail;
        this.videoUrl = recipe.href;
        this.category = recipe.strCategory;
    }
}

class RecipeFinderAPIManager {
    async getRecipesForIngredient(ingredient, categories, filters) {
        return await axios.get(RECIPE_API + ingredient)
        .then((response) => {
            let recipes = response.data.results.map(recipe => new Recipe(recipe));
            recipes = this._filterRecipes(recipes, filters);
            recipes = this._categorizeRecipes(recipes, categories);
            return recipes;
        });
    }

    _filterRecipes(recipes, filters) {
        return recipes.filter(recipe =>
            !recipe.ingredients.some(ingredient => 
                filters.some(filter => 
                    foodFilters[filter].includes(ingredient.toLowerCase())
        )));
    }

    _categorizeRecipes(recipes, categories) {
        if(!categories.length)
            return recipes;
        return recipes.filter(recipe => 
            categories.includes(recipe.category)
        );
    }
}

module.exports = new RecipeFinderAPIManager();