const model = require("../model/model");

exports.getAllTopics = (req, res, next) => {
  model.selectAllTopics().then((response) => {
    res.status(200).send(response);
  });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;
  model
    .retrieveCommentsByArticleId(articleId)
    .then((data) => {
      res.status(200).send({ comments: data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllArticles = (req, res, next) => {
  const topic = req.query.topic;
  model
    .retrieveAllArticles(topic)
    .then((data) => {
      res.status(200).send({ articles: data });
    })
    .catch((err) => {
      return next(err);
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
};
exports.postArticleById = (req, res, next) => {
  const articleId = req.params.article_id;

  const requestBody = req.body;
  const { username, body } = requestBody;
  model
    .insertCommentByArticleId(username, body, articleId)
    .then((data) => {
      res.status(201).send({ comments: data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  const articleId = req.params.article_id;
  const patchData = req.body.inc_votes;
  model
    .updateArticleById(articleId, patchData)
    .then((data) => {
      const article = data[0];
      res.status(200).send({ updatedArticle: article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteCommentById = (req, res, next) => {
  const articleId = req.params.comment_id;

  model
    .deleteComment(articleId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllUsers = (req, res, next) => {
  model.retrieveAllTopics().then((data) => {
    res.status(200).send({ users: data });
  });
};
