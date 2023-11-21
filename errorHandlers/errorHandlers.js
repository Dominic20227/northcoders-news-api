exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "400 bad request" });
  }
  next(err);
};

exports.handleCustomErros = (err, req, res, next) => {
  if (err === "404 not found") {
    res.status(404).send({ msg: "404 not found" });
  }
};
