const { foodFilters, STARS_UPPER_RANGE } = require("../config");
const randomGenerator = require("../utils/random-generator");

class Recipe {
    constructor(recipe) {
        this.title = recipe.title;
        this.ingredients = recipe.ingredients;
        this.imgUrl = recipe.thumbnail;
        this.videoUrl = recipe.href;
        this.category = recipe.strCategory;
        this.chefName = randomGenerator.generateRandomName();
        this.rating = randomGenerator.generateRandomNumber(STARS_UPPER_RANGE);
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
    constructor(recipes, filters, categories) {
        this._recipes = recipes.map(recipe => new Recipe(recipe));
        this._recipes = this.filterRecipes(filters);
        this._recipes = this.categorizeRecipes(categories);
    }

    get recipes() {
        return this._recipes;
    }

    filterRecipes(filters) {
        return this._recipes.filter(recipe => 
            !recipe.applyIngredientFilter(filters))
    }

    categorizeRecipes(categories) {
        if(!categories.length)
            return this._recipes;
        return this._recipes.filter(recipe => 
            categories.includes(recipe.category)
        );
    }
}

module.exports = {
    RecipesManager
}