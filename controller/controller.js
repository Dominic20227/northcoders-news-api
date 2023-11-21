const model = require("../model/model");

exports.getAllTopics = (req, res) => {
  model.selectAllTopics().then((response) => {
    res.status(200).send(response);
  });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;
  model
    .retrieveCommentsByArticleId(articleId)
    .then((data) => {
      res.status(200).send({ comments: data });
    })
    .catch((err) => {
      next(err);
    });
};
