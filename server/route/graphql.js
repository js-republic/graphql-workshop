const Router = require("express").Router;
const graphqlHTTP = require("express-graphql");
const buildSchema = require("graphql").buildSchema;
const service = require("../service");

const router = Router();

const schema = buildSchema(`
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
    posts(limit: Int, offset: Int): [Post]!
    post(id: ID!): Post
    comments(postId: ID!): [Comment]!
  }
  type Mutation {
    createComment(postId:ID!, content: String!): Comment
    createPost(newPost: PostInput): Post
}
`);

router.use(
  graphqlHTTP({
    schema,
    rootValue: {
      posts: args => {
        if (!args) {
          return service.getPosts();
        }

        const { limit, offset } = args;

        return service.getPosts(limit, offset);
      },
      createPost: ({ newPost }) => service.addNewPost(newPost),
      createComment: params =>
        service.addNewCommentFor(params.postId, params.content)
    },
    graphiql: true
  })
);

module.exports = router;
