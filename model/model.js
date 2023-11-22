const db = require("../db/connection");

exports.selectAllTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
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
