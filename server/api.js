const { Router } = require("express");
const { RecipesManager } = require("./external_api/recipe");
const RecipeFinderAPIManager = require("./external_api/recipeApiManager");


const router = Router();

router.get("/recipes/:ingredient", (req, res) => {
    const ingredient = req.params.ingredient;
    let {filters, categories} = req.query;
    filters = JSON.parse(filters);
    categories = JSON.parse(categories);

    RecipeFinderAPIManager.getRecipesByIngredient(ingredient)
    .then((recipes) => {
        const processedRecipes = RecipesManager.processRecipes(recipes, filters, categories);
        res.send({success: true, recipes: processedRecipes});
    })
    .catch(error => {
        res.status(500);
        res.send({success: false, msg: "Something went wrong while retrieving the recipes :("});
        console.log("GET /recipes/:ingredient error\n" + error);
    });
});

module.exports = router;