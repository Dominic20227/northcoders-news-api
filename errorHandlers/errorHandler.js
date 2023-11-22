exports.handleCustomErrors = (err, req, res, next) => {
  if (err === "article_id out of range") {
    res.status(404).send({ msg: "404 not found" });
  }
  next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "400 bad request" });
  }
};
