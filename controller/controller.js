const model = require("../model/model");

exports.getAllTopics = (req, res) => {
  model.selectAllTopics().then((response) => {
    res.status(200).send(response);
  });
};

exports.getAllUsers = (req, res, next) => {
  model.retrieveAllTopics().then((data) => {
    res.status(200).send({ users: data });
  });
};
