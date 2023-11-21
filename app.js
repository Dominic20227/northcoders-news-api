const express = require("express");
const app = express();

const controller = require("./controller/controller");

app.get("/api/topics", controller.getAllTopics);

app.get("/api/articles", controller.getAllArticles);

module.exports = app;
