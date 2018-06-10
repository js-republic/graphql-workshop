const Router = require("express").Router;
const graphqlHTTP = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");
const service = require("../service");

const router = Router();

const typeDefs = `
type Post {
  id: ID!
  title: String!
  content: String!
  comments: [Comment]!
}
input PostInput {
  title: String!,
  content: String!
}
type Comment {
  id: ID!
  content: String!
}
type Query {
  posts: [Post]!
  post(id: ID!): Post
}
type Mutation {
  createComment(postId:ID!, content: String!): Comment
  createPost(newPost: PostInput): Post
}
`;

const resolvers = {
  Query: {
    posts() {
      return service.getPosts();
    },
    post(parentValue, args) {
      return service.getPostById(args.id);
    }
  },
  Mutation: {
    createComment(parentValue, args) {
      return service.addNewCommentFor(args.postId, args.content);
    },
    createPost(parentValue, args) {
      return service.addNewPost(args.newPost);
    }
  },
  Post: {
    comments(post) {
      return service.getCommentsFor(post.id);
    }
  }
};

router.use(
  graphqlHTTP({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true
  })
);

module.exports = router;
