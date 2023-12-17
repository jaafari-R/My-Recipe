const myRecipe = new MyRecipeApiManager();
const renderer = new Renderer();

const getRecipesBtn = $("#getRecipesBtn");
const getRecipesInput = $("#ingredient");

$("#getRecipesBtn").click(function() {
    myRecipe.getRecipesForIngredient(getRecipesInput.val())
    .then((recipes) => {
        console.log(recipes)
        console.log()
        renderer.render(recipes);
    });
})
