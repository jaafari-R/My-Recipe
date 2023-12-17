const express = require("express");
const router = require("./server/api");

const PORT = 3000; 

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(router);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});