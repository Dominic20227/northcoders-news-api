const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

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

app.post("/api/articles/:article_id/comments", controller.postArticleById);

app.patch("/api/articles/:article_id", controller.patchArticleById);

app.delete("/api/comments/:comment_id", controller.deleteCommentById);

app.get("/api/users", controller.getAllUsers);

app.use(errorHandlers.handleCustomErrors);
app.use(errorHandlers.handlePsqlErrors);
module.exports = app;
