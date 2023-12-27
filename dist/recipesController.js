const renderer = new Renderer();

const getRecipesBtn = $(controllerConfigs.GET_RECIPE_BUTTON_SELECTOR);
const loadMoreRecipesBtn = $(controllerConfigs.LOAD_MORE_RECIPES_BUTTON_SELECTOR);
const getRecipesInput = $(controllerConfigs.INGREDIENT_INPUT_SELECTOR);
const checkboxes = $(".checkbox");
const filtersInputs = foodFilters.map(filter => $(`#${filter}`));
const categoriesInputs = foodCategories.map(category => $(`#${category}`));


class RecipeController {
    constructor() {
        this.state = {
            limit: controllerConfigs.PAGE_LIMIT,
            offset: 0,
            ingredientQuery: "",
            filtersQuery: [],
            categoriesQuery: []
        }

        this._setUpEventListeners();
        loadMoreRecipesBtn.prop('disabled', true);
    }

    getRecipes() {
        if(!ingredient)
            alert("Please Enter an ingredient!");
    
        return MyRecipeApiManager.getRecipesForIngredient(this.state)
        .then((results) => results.recipes);
    }

    loadFirstPatchRecipes() {
        this.state.ingredientQuery = getRecipesInput.val();
        this.state.filtersQuery = getCheckedBoxes(filtersInputs);
        this.state.categoriesQuery = getCheckedBoxes(categoriesInputs);
        this.state.offset = 0;
        loadMoreRecipesBtn.prop('disabled', true);
        
        this.getRecipes()
        .then(recipes => {
            renderer.renderRecipes({recipes})
            if(recipes.length === controllerConfigs.PAGE_LIMIT) {
                loadMoreRecipesBtn.prop('disabled', false);
            }
    });
    }

    loadMoreRecipes() {
        loadMoreRecipesBtn.prop('disabled', true);

        ++this.state.offset;
        this.getRecipes()
        .then(recipes => {
            renderer.renderMoreRecipes({recipes})
            if(recipes.length === controllerConfigs.PAGE_LIMIT) {
                loadMoreRecipesBtn.prop('disabled', false);
            }
        })
    }

    _setUpEventListeners() {
        const controller = this;
        loadMoreRecipesBtn.click(function() {
            controller.loadMoreRecipes();
        })

        getRecipesBtn.click(function() {
            controller.loadFirstPatchRecipes();
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
            controller.loadFirstPatchRecipes();
        })
    }


}


function main() {
    const recipeController = new RecipeController();
}

main();




/// helpers
function getCheckedBoxes(checkboxesInput) {
    return checkboxesInput
        .filter(checkbox => checkbox.data("checked") == "true")
        .map(checkbox => checkbox.attr("id"));
}