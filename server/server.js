// This is what needs to be comppleted:
// 1. Set up an Apollo Server to use GraphQL queries and mutations to fetch and modify data, replacing the existing RESTful API.

// 2. Modify the existing authentication middleware so that it works in the context of a GraphQL API.

// 3. Create an Apollo Provider so that requests can communicate with an Apollo Server.

// 4. Deploy your application to Render with a MongoDB database using MongoDB Atlas.

// type Query holds all the get APIs and type Mutation holds all the creation, update or delete APIs.

// With apollo-server-express we need to use the expressMiddleware function

const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
  }

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
