const db = require("../db/connection");

exports.selectAllTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
};

exports.updateArticleById = (articleId, patchData) => {
  return db
    .query(
      `UPDATE articles 
                  SET votes = votes + $1
                  WHERE article_id = $2
                  Returning *`,
      [patchData, articleId]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject("404 not found");
      }
      return rows;
    });
};
