const express = require("express");
const app = express();
const errorHandlers = require("./errorHandlers/errorHandlers");

app.use(express.json());

const controller = require("./controller/controller");

app.get("/api/topics", controller.getAllTopics);

app.get("/api/users", controller.getAllUsers);

app.use(errorHandlers.handleCustomErrors);
app.use(errorHandlers.handlePsqlErrors);
module.exports = app;
