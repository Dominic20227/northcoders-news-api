exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: "404 not found" });
  }
  if (err.status === 400) {
    res.status(400).send({ status: 400, msg: "bad request" });
  }
  next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "400 bad request" });
  }
};
