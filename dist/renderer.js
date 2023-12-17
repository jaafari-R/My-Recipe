const RECIPE_CONTAINER_SELECTOR = "#recipes-container"
const RECIPE_TEMPLATE_SELECTOR = "#recipes-template"

class Renderer {
    constructor() {
        this.template = Handlebars.compile($(RECIPE_TEMPLATE_SELECTOR).html());
        this.container = $(RECIPE_CONTAINER_SELECTOR);
    }
    render(data) {
        this.container.empty();
        console.log("HI")
        const HTML = this.template(data);
        this.container.append(HTML);
    }
}
