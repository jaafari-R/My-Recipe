const externalApiConfigs = {
    RECIPE_API: "https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/"
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
