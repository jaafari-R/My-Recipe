class MyRecipeApiManager {
    getRecipesForIngredient(ingredient) {
        return $.get("recipes/" + ingredient)
        .then(data => {
            return data;
        });
    }
}