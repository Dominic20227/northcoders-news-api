const express = require("express");
const app = express();

const errorHandlers = require("./errorHandlers/errorHandlers");

app.use(express.json());

const controller = require("./controller/controller");

app.get("/api/topics", controller.getAllTopics);

app.post("/api/articles/:article_id/comments", controller.postArticleById);

app.use(errorHandlers.handlePsqlErrors);
module.exports = app;
