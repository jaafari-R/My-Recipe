const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});