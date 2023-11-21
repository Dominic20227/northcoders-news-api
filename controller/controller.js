const model = require("../model/model");

exports.getAllTopics = (req, res) => {
  model.selectAllTopics().then((response) => {
    res.status(200).send(response);
  });
};

exports.getAllArticles = (req, res, next) => {
  model.retrieveAllArticles().then((data) => {
    res.status(200).send({ articles: data });
  });
};
