const myRecipe = new MyRecipeApiManager();
const renderer = new Renderer();

const getRecipesBtn = $(controllerConfigs.GET_RECIPE_BUTTON_SELECTOR);
const getRecipesInput = $(controllerConfigs.INGREDIENT_INPUT_SELECTOR);
const checkboxes = $(".checkbox");
const filtersInputs = foodFilters.map(filter => $(`#${filter}`));
const categoriesInputs = foodCategories.map(category => $(`#${category}`));

getRecipesBtn.click(function() {
    getRecipes();
})
checkboxes.click(function() {
    const checkbox = $(this);
    if(checkbox.data("checked") == "true") {
        checkbox.data("checked", "false");
        checkbox.css({"background-color": "black", "color": "white"})
    } else {
        checkbox.data("checked", "true");
        checkbox.css({"background-color": "red", "color": "#ddd"})

    }

    getRecipes();
})

function getRecipes() {
    const ingredient = getRecipesInput.val();
    const usedFilters = getCheckedBoxes(filtersInputs);
    const checkedCategories = getCheckedBoxes(categoriesInputs);
    
    if(!ingredient)
        return;

    myRecipe.getRecipesForIngredient(
        ingredient,
        usedFilters,
        checkedCategories)
    .then((recipes) => {
        renderer.renderRecipes(recipes);
    });
}

/// helpers
function getCheckedBoxes(checkboxesInput) {
    return checkboxesInput
        .filter(checkbox => checkbox.data("checked") == "true")
        .map(checkbox => checkbox.attr("id"));
}


/////
$(".checkbox").click(function() {

})

// disable refresh on form submition
$("#recipes-form").on("submit", function() {return false;})