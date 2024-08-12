// This is what needs to be comppleted:
// 1. Set up an Apollo Server to use GraphQL queries and mutations to fetch and modify data, replacing the existing RESTful API.

// 2. Modify the existing authentication middleware so that it works in the context of a GraphQL API.

// 3. Create an Apollo Provider so that requests can communicate with an Apollo Server.

// 4. Deploy your application to Render with a MongoDB database using MongoDB Atlas.

// type Query holds all the get APIs and type Mutation holds all the creation, update or delete APIs.

// With apollo-server-express we need to use the expressMiddleware function

const express = require("express");
// Import ApolloServer and ExpressMiddleware to convert to GraphQL
const { typeDefs, resolvers } = require("./schemas");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleWare } = require("@apollo/server/express4");

const path = require("path");
// Will need to import typeDefs and Resolvers here when created
const db = require("./config/connection");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/graphql", expressMiddleWare(server));

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
  }

  app.use(routes); // This will be going away when we have established our Resolvers and TypeDefs

  // Updated to add another console.log to show where the graphql server is running
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 API server is listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};
// Invoke the apolloServer
startApolloServer();
