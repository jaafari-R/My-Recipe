const { default: axios } = require("axios");

const { RECIPE_API } = require("../config").externalApiConfigs;

const dairyIngredients = ["Cream","Cheese","Milk","Butter","Creme","Ricotta","Mozzarella","Custard","Cream Cheese"]
const glutenIngredients = ["Flour","Bread","spaghetti","Biscuits","Beer"]
const nutIngredients = ["Peanuts", "Almonds", "Brazil Nuts", "Cashews", "Hazelnuts", "Macadamia Nuts", "Pecans", "Pecan Nuts", "Pistachios", "Walnuts"]

class Recipe {
    constructor(recipe) {
        this.title = recipe.title;
        this.ingredients = recipe.ingredients;
        this.imgUrl = recipe.thumbnail;
        this.videoUrl = recipe.href;
    }
}

class RecipeFinderAPIManager {
    async getRecipesForIngredient(ingredient, dairyFree, glutenFree, nutFree) {
        return await axios.get(RECIPE_API + ingredient)
        .then((response) => {
            const recipes = response.data.results.map(recipe => new Recipe(recipe));
            return this._filterRecipes(recipes, glutenFree, dairyFree, nutFree);
        });
    }

    _filterRecipes(recipes, glutenFree, dairyFree, nutFree) {
        if(!glutenFree && !dairyFree, !nutFree)
            return recipes;


        return recipes.filter(recipe => 
            !recipe.ingredients.find(ingredient => 
                (dairyFree && dairyIngredients.includes(ingredient)) ||
                (glutenFree && glutenIngredients.includes(ingredient)) ||
                (nutFree && nutIngredients.includes(ingredient))
            ))
    }
}

module.exports = new RecipeFinderAPIManager();