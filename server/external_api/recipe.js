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
    static processRecipes(recipes, filters, categories) {
        recipes = recipes.map(recipe => new Recipe(recipe));
        recipes = RecipesManager.filterRecipes(recipes, filters);
        recipes = RecipesManager.categorizeRecipes(recipes, categories);
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
}

module.exports = {
    RecipesManager
}
