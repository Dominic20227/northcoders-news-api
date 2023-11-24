const db = require("../db/connection");
const fs = require("fs/promises");

exports.selectAllTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
};

exports.retrieveCommentsByArticleId = (articleId) => {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`,
      [articleId]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "404 not found" });
      }
      return rows;
    });
};

exports.retrieveAllArticles = () => {
  return db
    .query(
      `SELECT
    a.article_id,
    a.title,
    a.topic,
    a.author AS author,
    a.created_at,
    a.votes AS votes,
    a.article_img_url,
    COALESCE(COUNT(c.comment_id), 0) AS comment_count
FROM
    articles a
LEFT JOIN
    comments c ON a.article_id = c.article_id
GROUP BY
    a.article_id
ORDER BY
    a.created_at DESC;`
    )
    .then(({ rows }) => {
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
    .query(
      `SELECT
    a.article_id,
    a.title,
    a.topic,
    a.author AS author,
    a.body,
    a.created_at,
    a.votes AS votes,
    a.article_img_url,
    COALESCE(COUNT(c.comment_id), 0) AS comment_count
FROM
    articles a
LEFT JOIN
    comments c ON a.article_id = c.article_id
WHERE
    a.article_id = $1
GROUP BY
    a.article_id`,
      [articleId]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
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
        return Promise.reject({ status: 404, msg: "404 not found" });
      }
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
        return Promise.reject({ status: 404, msg: "404 not found" });
      }
      return {};
    });
};

exports.retrieveAllTopics = () => {
  return db.query(`SELECT * FROM users;`).then(({ rows }) => {
    return rows;
  });
};
