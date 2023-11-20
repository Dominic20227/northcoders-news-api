const model = require("../model/model");

exports.getAllTopics = (req, res) => {
  model.getAllTopics().then((response) => {
    res.status(200).send(response);
  });
};
