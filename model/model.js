
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



exports.selectArticleById = (articleId) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [articleId])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return rows;
    });
};




