const { default: axios } = require("axios");

const { RECIPE_API } = require("../config").externalApiConfigs;

const dairyIngredients = ["Cream","Cheese","Milk","Butter","Creme","Ricotta","Mozzarella","Custard","Cream Cheese"]
const glutenIngredients = ["Flour","Bread","Spaghetti","Biscuits","Beer"]
const nutIngredients = ["Peanuts", "Almonds", "Brazil Nuts", "Cashews", "Hazelnuts", "Macadamia Nuts", "Pecans", "Pecan Nuts", "Pistachios", "Walnuts"]
dairyIngredients.push(...dairyIngredients.map(ing => ing.toLowerCase()));
glutenIngredients.push(...glutenIngredients.map(ing => ing.toLowerCase()));
nutIngredients.push(...nutIngredients.map(ing => ing.toLowerCase()));

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
    async getRecipesForIngredient(ingredient, categories, dairyFree, glutenFree, nutFree) {
        return await axios.get(RECIPE_API + ingredient)
        .then((response) => {
            let recipes = response.data.results.map(recipe => new Recipe(recipe));
            recipes = this._filterRecipes(recipes, glutenFree, dairyFree, nutFree);
            recipes = this._categorizeRecipes(recipes, categories);
            return recipes;
        });
    }

    _filterRecipes(recipes, glutenFree, dairyFree, nutFree) {
        return recipes.filter(recipe =>
            !recipe.ingredients.find(ingredient => 
                (dairyFree && dairyIngredients.includes(ingredient)) ||
                (glutenFree && glutenIngredients.includes(ingredient)) ||
                (nutFree && nutIngredients.includes(ingredient))
        ));
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