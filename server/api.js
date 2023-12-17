const { Router } = require("express");
const recipeFinderApiManager = require("./external_api/recipe");

const router = Router();

router.get("/recipes/:ingredient", async (req, res) => {
    const ingredient = req.params.ingredient;
    const recipes = await recipeFinderApiManager.getRecipesForIngredient(ingredient);
    if(recipes.length) {
        res.send({success: true, recipes});
    }
    else {
        res.status(404);
        res.send({success: false});
    }
});

module.exports = router;