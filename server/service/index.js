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
    const postQuery =
      nbPost !== Infinity
        ? `SELECT * from Post LIMIT ${nbPost} OFFSET ${offset}`
        : `SELECT * from Post`;
    const query = `
    SELECT Post.*, Comment.id as 'commentId', Comment.content as 'comment'
    FROM (${postQuery}) as Post
    LEFT JOIN Comment ON Comment.postId = Post.id`;
    return db.all(query).then(all =>
      values(
        all.reduce((acc, curr) => {
          if (acc[curr.id] && !!curr.commentId) {
            acc[curr.id].comments.push(extractComment(curr));
          } else {
            acc[curr.id] = {
              id: curr.id,
              title: curr.title,
              content: curr.content,
              comments: curr.comment ? [extractComment(curr)] : []
            };
          }
          return acc;
        }, {})
      )
    );
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
    console.log(`Adding :: ${postId} :: ${content}`);
    const id = uuid();
    return db
      .run(
        "INSERT INTO Comment (id, content, postId) VALUES (?, ?, ?)",
        id,
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
