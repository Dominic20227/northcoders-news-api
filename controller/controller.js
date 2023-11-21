const model = require("../model/model");

exports.getAllTopics = (req, res) => {
  model.selectAllTopics().then((response) => {
    res.status(200).send(response);
  });
};

exports.deleteCommentById = (req, res, next) => {
  const articleId = req.params.comment_id;

  model
    .deleteComment(articleId)
    .then(() => {
      res.status(204).send({});
    })
    .catch((err) => {
      next(err);
    });
};
