const myRecipe = new MyRecipeApiManager();
const renderer = new Renderer();

const getRecipesBtn = $(controllerConfigs.GET_RECIPE_BUTTON_SELECTOR);
const getRecipesInput = $(controllerConfigs.INGREDIENT_INPUT_SELECTOR);
const filtersInputs = foodFilters.map(filter => $(`#${filter}`));
const categoriesInputs = foodCategories.map(category => $(`#${category}`));

getRecipesBtn.click(function() {
    const usedFilters = getCheckedBoxes(filtersInputs);
    const checkedCategories = getCheckedBoxes(categoriesInputs);
    
    myRecipe.getRecipesForIngredient(
        getRecipesInput.val(),
        usedFilters,
        checkedCategories)
    .then((recipes) => {
        renderer.renderRecipes(recipes);
    });
})
 

/// helpers
function getCheckedBoxes(checkboxesInput) {
    return checkboxesInput
        .filter(checkbox => checkbox.is(":checked"))
        .map(checkbox => checkbox.attr("id"));
}
