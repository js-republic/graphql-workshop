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
}
`;

const resolvers = {};

router.use(
  graphqlHTTP({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true
  })
);

module.exports = router;
