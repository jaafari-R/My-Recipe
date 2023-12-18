const express = require("express");
const router = require("./server/api");

const PORT = 3000; 

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(router);

app.use(express.static(`${__dirname}/dist`))
app.use(express.static(`${__dirname}/node_modules/jquery/dist`))
app.use(express.static(`${__dirname}/node_modules/handlebars`))

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});