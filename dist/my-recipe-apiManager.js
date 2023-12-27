class MyRecipeApiManager {
    static getRecipesForIngredient({ingredientQuery, filtersQuery, categoriesQuery, limit = 0 ,offset = 0}) {
        let queries = "";
        queries += `categories=${JSON.stringify(categoriesQuery)}`;
        queries += `&filters=${JSON.stringify(filtersQuery)}`;
        queries += `&limit=${limit}&offset=${offset}`
        return $.get(`recipes/${ingredientQuery}?${queries}`)
        .then(data => {
            return data;
        });
    }
}