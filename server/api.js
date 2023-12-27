const { Router } = require("express");
const { RecipesManager } = require("./external_api/recipes/recipe");
const RecipeFinderAPIManager = require("./external_api/recipes/recipeApiManager");
const { paginateData } = require("./pagination")

const router = Router();

router.get("/recipes/:ingredient", (req, res) => {
    const ingredient = req.params.ingredient;
    let {limit, offset, filters, categories} = req.query;
    filters = JSON.parse(filters);
    categories = JSON.parse(categories);
    limit = limit ? Number(limit) : 0;
    offset = offset ? Number(offset) : 0;

    RecipeFinderAPIManager.getRecipesByIngredient(ingredient)
    .then((recipes) => {
        RecipesManager.processRecipes(recipes, filters, categories)
        .then(processedRecipes => {
            processedRecipes = paginateData(processedRecipes, limit, offset); 
            res.send({success: true, recipes: processedRecipes});
        });
    })
    // .catch(error => {
    //     res.status(500);
    //     res.send({success: false, msg: "Something went wrong while retrieving the recipes :("});
    //     console.log("GET /recipes/:ingredient error\n" + error);
    // });
});

module.exports = router;