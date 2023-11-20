const model = require("../model/model");

exports.getAllTopics = (req, res, next) => {
  model.selectAllTopics().then((response) => {
    res.status(200).send(response);
  });
};

exports.getArticleById = (req, res, next) => {
  const articleId = req.params.id;
  model
    .selectArticleById(articleId)
    .then((data) => {
      res.status(200).send({ article: data });
    })
    .catch((err) => {
      next(err);
    });
};
