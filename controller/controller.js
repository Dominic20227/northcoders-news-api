const model = require("../model/model");

exports.getAllTopics = (req, res) => {
  model.selectAllTopics().then((response) => {
    res.status(200).send(response);
  });
};

exports.patchArticleById = (req, res, next) => {
  const articleId = req.params.article_id;
  const patchData = req.body.inc_votes;
  model
    .updateArticleById(articleId, patchData)
    .then((data) => {
      const article = data[0];
      res.status(200).send({ updatedArticle: article });
    })
    .catch((err) => {
      next(err);
    });
};
