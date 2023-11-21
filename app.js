const express = require("express");
const app = express();

const controller = require("./controller/controller");
const errorHandlers = require("./errorHandlers/errorHandlers");

app.get("/api/topics", controller.getAllTopics);

app.delete("/api/comments/:comment_id", controller.deleteCommentById);

app.use(errorHandlers.handleCustomErrors);
app.use(errorHandlers.handlePsqlErrors);
module.exports = app;
