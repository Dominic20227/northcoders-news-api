const express = require("express");
const app = express();

const controller = require("./controller/controller");

app.get("/api/topics", controller.getAllTopics);

module.exports = app;
