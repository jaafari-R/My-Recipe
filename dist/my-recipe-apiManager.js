class MyRecipeApiManager {
    getRecipesForIngredient(ingredient, dairyFree, glutenFree, nutFree) {
        return $.get(`recipes/${ingredient}
            ?dairyFree=${dairyFree}&glutenFree=${glutenFree}&nutFree=${nutFree}`)
        .then(data => {
            return data;
        });
    }
}