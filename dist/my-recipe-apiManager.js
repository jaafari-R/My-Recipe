class MyRecipeApiManager {
    getRecipesForIngredient(ingredient, dairyFree, glutenFree) {
        return $.get(`recipes/${ingredient}?dairyFree=${dairyFree}&glutenFree=${glutenFree}`)
        .then(data => {
            return data;
        });
    }
}