const express = require("express");
const app = express();

const controller = require("./controller/controller");

const errorHandlers = require("./errorHandlers/errorHandlers");

app.get("/api/topics", controller.getAllTopics);
app.get("/api", controller.getApi);
app.get("/api/articles/:id", controller.getArticleById);

app.get("/api/articles", controller.getAllArticles);

app.get(
  "/api/articles/:article_id/comments",
  controller.getCommentsByArticleId
);

app.use(errorHandlers.handleCustomError);
app.use(errorHandlers.handlePsqlErrors);
module.exports = app;
