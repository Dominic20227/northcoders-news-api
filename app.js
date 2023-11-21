const express = require("express");
const app = express();
const errorHandlers = require("./errorHandlers/errorHandlers");
const controller = require("./controller/controller");

app.use(express.json());

app.get("/api/topics", controller.getAllTopics);

app.patch("/api/articles/:article_id", controller.patchArticleById);

app.use(errorHandlers.handlePsqlErrors);
app.use(errorHandlers.handleCustomErros);

module.exports = app;
