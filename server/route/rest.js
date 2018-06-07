const Router = require("express").Router;
const service = require("../service");

const router = Router();

function getAll(fn) {
  return (req, res, next) => {
    fn()
      .then(data => res.json(data))
      .catch(err => next(err));
  };
}
function getById(fn, idName) {
  return (req, res, next) => {
    fn(req.params[idName])
      .then(data => res.json(data))
      .catch(err => next(err));
  };
}

router
  .route("/posts")
  .get((req, res, next) => {
    service
      .getPosts()
      .then(posts =>
        posts.map(post => ({
          id: post.id,
          title: post.title,
          content: post.content
        }))
      )
      .then(data => res.json(data))
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    service
      .addNewPost({
        title: req.body.title,
        content: req.body.content
      })
      .then(() => res.sendStatus(201))
      .catch(err => next(err));
  });

router.route("/posts/:postId").get(getById(service.getPostById, "postId"));

router
  .route("/posts/:postId/comments")
  .get(getById(service.getCommentsFor, "postId"))
  .post((req, res, next) => {
    service
      .addNewCommentFor(req.params.postId, req.body.content)
      .then(comment => res.status(201).json(comment))
      .catch(err => next(err));
  });

module.exports = router;
