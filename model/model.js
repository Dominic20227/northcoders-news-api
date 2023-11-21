const db = require("../db/connection");

exports.selectAllTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
};

exports.insertCommentByArticleId = (username, body, articleID) => {
  return db
    .query(
      `INSERT INTO comments
                          (body, author, article_id)
                          
                          
                          VALUES
                          ($1, $2, $3)
                          RETURNING *`,
      [body, username, articleID]
    )
    .then(({ rows }) => {
      return rows;
    });
};
