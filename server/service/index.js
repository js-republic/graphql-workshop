const db = require("sqlite");
const Promise = require("bluebird");
const uuid = require("uuid/v1");
const { values } = require("lodash");

const logger = require("../logger-conf").logger;

const extractComment = post => ({
  id: post.commentId,
  content: post.comment
});

module.exports = {
  onReady() {
    return db
      .open("./blog.sqlite", { Promise, verbose: true })
      .then(() => db.migrate());
  },
  getPosts(nbPost = Infinity, offset = 0) {
    const query =
      nbPost !== Infinity
        ? `SELECT * from Post LIMIT ${nbPost} OFFSET ${offset}`
        : `SELECT * from Post`;
    return db.all(query);
  },
  addNewPost(newPost) {
    const id = uuid();
    return db
      .run(
        "INSERT INTO Post (id, title, content) VALUES (?, ?, ?)",
        id,
        newPost.title,
        newPost.content
      )
      .then(() => ({
        id,
        title: newPost.title,
        content: newPost.content,
        comments: []
      }));
  },
  getPostById(postId) {
    return db.get("SELECT * FROM Post WHERE id=?", postId);
  },
  getCommentsFor(postId) {
    return db.all("SELECT * FROM Comment WHERE postId=?", postId);
  },
  addNewCommentFor(postId, content) {
    const id = uuid();
    return db
      .run(
        "INSERT INTO Comment (id, content, postId) VALUES (?, ?, ?)",
        uuid(),
        content,
        postId
      )
      .then(() => ({
        id,
        content,
        postId
      }));
  }
};
