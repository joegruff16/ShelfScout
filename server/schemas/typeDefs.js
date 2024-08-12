const typeDefs = `
  type Book {
    id: ID!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type Auth {
    token: ID!
    user: User!
  }
  
  type Query {
  
  }

`;

module.exports = typeDefs;
