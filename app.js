const express = require("express");
const app = express();

const controller = require("./controller/controller");
const errorHandlers = require("./errorHandlers/errorHandler.js");

app.get("/api/topics", controller.getAllTopics);

app.get("/api/articles/:id", controller.getArticleById);

app.use(errorHandlers.handleCustomErrors);
app.use(errorHandlers.handlePsqlErrors);

module.exports = app;
