class MyRecipeApiManager {
    getRecipesForIngredient(ingredient, filters, categories) {
        let queries = "";
        filters.forEach(filter => queries += `${filter}=true&`);
        queries += `categories=${JSON.stringify(categories)}`;
        return $.get(`recipes/${ingredient}?${queries}`)
        .then(data => {
            return data;
        });
    }
}