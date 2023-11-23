const { CLASS_TYPES } = require("@babel/types");
const db = require("../db/connection");
const fs = require("fs/promises");

exports.selectAllTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
};

exports.retrieveApi = () => {
  return fs.readFile(`${__dirname}/../endpoints.json`).then((data) => {
    return data;
  });
};

///home/dominic-malloy/northcoders/backend/be-nc-news/model/model.js
///home/dominic-malloy/northcoders/backend/be-nc-news/endpoints.json
