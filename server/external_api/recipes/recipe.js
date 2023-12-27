const { foodFilters, STARS_UPPER_RANGE } = require("../../config");
const RandomGenerator = require("../../utils/random-generator");
const GiphyApiManager = require("../giphy/giphyApiManager");

class Recipe {
    constructor(recipe) {
        this.title = recipe.title;
        this.ingredients = recipe.ingredients;
        // this.imgUrl = recipe.thumbnail;
        this.videoUrl = recipe.href;
        this.category = recipe.strCategory;
        this.chefName = RandomGenerator.generateRandomName();
        this.rating = RandomGenerator.generateRandomNumber(STARS_UPPER_RANGE);
        this.gifUrl = recipe.thumbnail;
    }

    // returns true if at least one filter applies
    applyIngredientFilter(filters) {
        return this.ingredients.some(ingredient => 
            filters.some(filter => 
                foodFilters[filter].includes(ingredient.toLowerCase())
        ))
    }
}

class RecipesManager {
    static async processRecipes(recipes, filters, categories) {
        recipes = recipes.map(recipe => new Recipe(recipe));
        recipes = RecipesManager.filterRecipes(recipes, filters);
        recipes = RecipesManager.categorizeRecipes(recipes, categories);
        recipes = await RecipesManager.setRecipesGifs(recipes);
        return recipes;
    }

    static filterRecipes(recipes, filters) {
        return recipes.filter(recipe => 
            !recipe.applyIngredientFilter(filters))
    }

    static categorizeRecipes(recipes, categories) {
        if(!categories.length)
            return recipes;
        return recipes.filter(recipe => 
            categories.includes(recipe.category)
        );
    }

    static setRecipesGifs(recipes) {
        const gifRequests = []
        for(let i in recipes) {
            const gifRequest = GiphyApiManager.getGif(recipes[i].title)
            .then(gifUrl => {
                if(gifUrl) {
                    recipes[i].gifUrl = gifUrl;
                }
            });
            gifRequests.push(gifRequest);
        }
        return Promise.all(gifRequests).then(() => {
            return recipes;
        })
    }
}

module.exports = {
    RecipesManager
}
