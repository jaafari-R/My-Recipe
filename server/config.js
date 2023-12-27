const externalApiConfigs = {
    RECIPE_API: "https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/",
    GIPHY_API: "https://api.giphy.com/v1/gifs/search?api_key=SZm3Ezv7v0hmUILQvH00XeUzUN4QRin9",
    GIPHY_QUERY_MAX_LENGTH: 50
}

const foodFilters = {
    DairyFree: ["cream","cheese","milk","butter","creme","ricotta","mozzarella","custard","cream cheese"],
    GlutenFree: ["flour","bread","spaghetti","biscuits","beer"],
    NutFree: ["peanuts","almonds","brazil nuts","cashews","hazelnuts","macadamia nuts","pecans","pecan nuts","pistachios","walnuts"]
}

const STARS_UPPER_RANGE = 6;

module.exports = {
    externalApiConfigs,
    foodFilters,
    STARS_UPPER_RANGE
}
