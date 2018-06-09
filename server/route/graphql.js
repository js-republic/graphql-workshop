const Router = require("express").Router;
const graphqlHTTP = require("express-graphql");
const {
  buildSchema,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInputObjectType
} = require("graphql");
const service = require("../service");

const router = Router();

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: {
    id: { type: GraphQLID },
    content: { type: GraphQLString }
  }
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "This is my post type",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(post) {
        return service.getCommentsFor(post.id);
      }
    }
  }
});

const PostInput = new GraphQLInputObjectType({
  name: "PostInput",
  description: "The input given in args",
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      args: {},
      resolve(parentValue, args) {
        return service.getPosts();
      }
    },
    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args) {
        return service.getPostById(args.id);
      }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    createComment: {
      type: CommentType,
      args: {
        postId: { type: GraphQLID },
        content: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return service.addNewCommentFor(args.postId, args.content);
      }
    },
    createPost: {
      type: PostType,
      args: {
        newPost: { type: PostInput }
      },
      resolve(parentValue, args) {
        return service.addNewPost(args.newPost);
      }
    }
  }
});

const schema2 = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
  types: [PostType, CommentType, PostInput]
});

router.use(
  graphqlHTTP({
    schema: schema2,
    graphiql: true
  })
);

module.exports = router;
