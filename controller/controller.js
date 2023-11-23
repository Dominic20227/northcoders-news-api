const model = require("../model/model");

exports.getAllTopics = (req, res) => {
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
