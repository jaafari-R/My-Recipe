const { Router } = require("express");
const recipeFinderApiManager = require("./external_api/recipe");

const router = Router();

router.get("/recipes/:ingredient", (req, res) => {
    const ingredient = req.params.ingredient;
    const {DairyFree, GlutenFree, NutFree, categories} = req.query;

    recipeFinderApiManager
    .getRecipesForIngredient(ingredient, 
        JSON.parse(categories), 
        DairyFree === "true", GlutenFree === "true",
        NutFree === "true")
    .then((recipes) => {
        res.send({success: true, recipes});
    })
    .catch(error => {
        res.status(500);
        res.send({success: false, msg: "Something went wrong while retrieving the recipes :("});
        console.log("GET /recipes/:ingredient error\n" + error);
    });
});

module.exports = router;