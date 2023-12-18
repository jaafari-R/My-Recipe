const { default: axios } = require("axios");

const { RECIPE_API } = require("../config").externalApiConfigs;

const dairyIngredients = ["Cream","Cheese","Milk","Butter","Creme","Ricotta","Mozzarella","Custard","Cream Cheese"]
const glutenIngredients = ["Flour","Bread","spaghetti","Biscuits","Beer"]

class Recipe {
    constructor(recipe) {
        this.title = recipe.title;
        this.ingredients = recipe.ingredients;
        this.imgUrl = recipe.thumbnail;
        this.videoUrl = recipe.href;
    }
}

class RecipeFinderAPIManager {
    async getRecipesForIngredient(ingredient, dairyFree, glutenFree) {
        return await axios.get(RECIPE_API + ingredient)
        .then((response) => {
            const recipes = response.data.results.map(recipe => new Recipe(recipe));
            return this._filterRecipes(recipes, glutenFree, dairyFree);
        });
    }

    _filterRecipes(recipes, glutenFree, dairyFree) {
        if(!glutenFree && !dairyFree)
            return recipes;

        return recipes.filter(recipe => 
            !recipe.ingredients.find(ingredient => 
                (dairyFree && dairyIngredients.find(dairyIng => dairyIng === ingredient)) ||
                (glutenFree && glutenIngredients.find(glutenIng => glutenIng === ingredient))
            ))
    }
}

module.exports = new RecipeFinderAPIManager();