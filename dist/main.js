const myRecipe = new MyRecipeApiManager();
const renderer = new Renderer();

const getRecipesBtn = $("#getRecipesBtn");
const getRecipesInput = $("#ingredient");
const dairyFreeInput = $("#dairyFree")
const glutenFreeInput = $("#glutenFree")

$("#getRecipesBtn").click(function() {
    myRecipe
    .getRecipesForIngredient(
        getRecipesInput.val(),
        dairyFreeInput.is(":checked"), 
        glutenFreeInput.is(":checked"))
    .then((recipes) => {
        console.log(recipes);
        renderer.render(recipes);
    });
})
