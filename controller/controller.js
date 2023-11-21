const model = require("../model/model");

exports.getAllTopics = (req, res) => {
  model.selectAllTopics().then((response) => {
    res.status(200).send(response);
  });
};

exports.postArticleById = (req, res, next) => {
  const articleId = req.params.article_id;

  const requestBody = req.body;
  const { username, body } = requestBody;
  model
    .insertCommentByArticleId(username, body, articleId)
    .then((data) => {
      res.status(201).send({ comments: data });
    })
    .catch((err) => {
      next(err);
    });
};
