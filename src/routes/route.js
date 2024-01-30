const express = require('express');
const route = express.Router();

const mainController = require("../controller/mainController");

route.get("/chatbot",mainController.index)
// route.get("/about",mainController.about)


route.all("/text", function (req, res) {
    res.status(400).send({status: false,message: "oke"})
})
module.exports = route;
