const myRecipe = new MyRecipeApiManager();
const renderer = new Renderer();

const getRecipesBtn = $(controllerConfigs.GET_RECIPE_BUTTON_SELECTOR);
const getRecipesInput = $(controllerConfigs.INGREDIENT_INPUT_SELECTOR);
const dairyFreeInput = $(controllerConfigs.DIARY_FREE_CHECKBOX_SELECTOR);
const glutenFreeInput = $(controllerConfigs.GLUTEN_FREE_CHECKBOX_SELECTOR);

getRecipesBtn.click(function() {
    myRecipe.getRecipesForIngredient(
        getRecipesInput.val(),
        dairyFreeInput.is(":checked"),
        glutenFreeInput.is(":checked"))
    .then((recipes) => {
        renderer.render(recipes);
    });
})
