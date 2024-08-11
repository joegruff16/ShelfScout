// This is what needs to be comppleted:
// 1. Set up an Apollo Server to use GraphQL queries and mutations to fetch and modify data, replacing the existing RESTful API.

// 2. Modify the existing authentication middleware so that it works in the context of a GraphQL API.

// 3. Create an Apollo Provider so that requests can communicate with an Apollo Server.

// 4. Deploy your application to Render with a MongoDB database using MongoDB Atlas.
// Having issues.
const express = require("express");
const path = require("path");
const db = require("./config/connection");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
