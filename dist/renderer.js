class Renderer {
    constructor() {
        this.template = Handlebars.compile($(rendererConfigs.RECIPE_TEMPLATE_SELECTOR).html());
        this.container = $(rendererConfigs.RECIPE_CONTAINER_SELECTOR);
    }
    render(data) {
        this.container.empty();
        const HTML = this.template(data);
        this.container.append(HTML);
    }
}
