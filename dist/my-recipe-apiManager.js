class MyRecipeApiManager {
    getRecipesForIngredient(ingredient, filters, categories) {
        let queries = "";
        queries += `categories=${JSON.stringify(categories)}`;
        queries += `&filters=${JSON.stringify(filters)}`;
        return $.get(`recipes/${ingredient}?${queries}`)
        .then(data => {
            return data;
        });
    }
}