var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    test: String,
    anotherTest: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  test: () => {
    return "Testing connection setup!";
  },
  anotherTest: () => {
    return "Different query successful";
  },
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(3333);
console.log("Connected to the woodshed at http://localhost:3333/graphql");
