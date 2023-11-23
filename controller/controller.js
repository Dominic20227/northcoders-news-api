const model = require("../model/model");

exports.getAllTopics = (req, res, next) => {
  model.selectAllTopics().then((response) => {
    res.status(200).send(response);
  });
};

exports.getApi = (req, res) => {
  model.retrieveApi().then((data) => {
    const parsedData = JSON.parse(data);
    res.status(200).send(parsedData);
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

