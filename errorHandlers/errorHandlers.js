exports.handleCustomError = (err, req, res, next) => {
  if (err.status) {
    res.status(404).send({ msg: "404 not found" });
  }
  next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code) {
    res.status(400).send({ msg: "400 bad request" });
  }
};
