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
    getSingleUser(id: ID, username: String): User
  }

  type Mutations {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    saveBook

    deleteBook
  }

`;

module.exports = typeDefs;
