class Renderer {
    constructor() {
        this.recipesTemplate = Handlebars.compile($(rendererConfigs.RECIPE_TEMPLATE_SELECTOR).html());
        this.recipesContainer = $(rendererConfigs.RECIPE_CONTAINER_SELECTOR);
        this.foodCategoriesTemplate = Handlebars.compile($(rendererConfigs.FOOD_CATEGORIES_TEMPLATE_SELECTOR).html());
        this.foodCategoriesContainer = $(rendererConfigs.FOOD_CATEGORIES_CONTAINER_SELECTOR);
        this.foodFiltersTemplate = Handlebars.compile($(rendererConfigs.FOOD_FILTER_TEMPLATE_SELECTOR).html());
        this.foodFiltersContainer = $(rendererConfigs.FOOD_FILTER_CONTAINER_SELECTOR);
        
        this._initialRender();
    }

    renderComponent(container, template, data) {
        container.empty();
        container.append(template(data));
    }
    renderComponentWithoutEmpty(container, template, data) {
        container.append(template(data));
    }
    _initialRender() {
        this.renderFoodCategoriesCheckboxes();
        this.renderFoodFilters();
        this.disableFormSubmission();
        this._createRatingHandlebarsHelper();
    }

    _createRatingHandlebarsHelper() {
        const createStar = (lit) => `<i class="fa-solid fa-star ${lit ? "lit-star" : ""}"></i>`;
        Handlebars.registerHelper("rating", function(litStarsCount) {
            let stars = "";
            for(let i = 0; i < 5; ++i) {
                stars += createStar(i < litStarsCount);
            }
            return stars;
        })
    }

    renderRecipes(data) {
        this.renderComponent(this.recipesContainer, this.recipesTemplate, data);
    }
    renderMoreRecipes(data) {
        this.renderComponentWithoutEmpty(this.recipesContainer, this.recipesTemplate, data);
    }
    
    renderFoodFilters() {
        this.renderComponent(this.foodFiltersContainer, this.foodFiltersTemplate, {foodFilters});
    }

    renderFoodCategoriesCheckboxes() {
        this.renderComponent(this.foodCategoriesContainer, this.foodCategoriesTemplate, {foodCategories});
    }
    
    // disable refresh on form submition
    disableFormSubmission() {
        $("#recipes-form").on("submit", function() {return false;})
    }
}
