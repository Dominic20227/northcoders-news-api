const db = require("../db/connection");

exports.selectAllTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
};

exports.deleteComment = (articleId) => {
  return db
    .query(
      `DELETE FROM comments 
                  WHERE comment_id = $1
                  RETURNING *`,
      [articleId]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject("404 not found");
      }
      return {};
    });
};
