// Import User Model
const { User } = require("../models/User");
const { signToken } = require("../utils/auth");
// This provides the functionality to find a user by a username and ID
const resolvers = {
  Query: {
    getSingleUser: async (_, { id, username }) => {
      const findUser = await User.findOne({
        $or: [{ _id: id }, { username: username }],
      });
      return findUser;
    },
  },
  Mutation: {
    // GraphQL POST logic to create a new user by identifying if the user exists via email. If the password is correct a token is generated along with the user
    createUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });

      if (!user) {
        throw new Error("User doesnt exist");
      }
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("There is no user found with this email");
      }

      const correctPw = await bcrypt.compare(password, user.password);

      if (!correctPw) {
        throw new Error("Incorrect Password");
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, { bookId }, context) => {
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: bookId } },
        { new: true }
      );

      return updatedUser;
    },
    deleteBook: async (_, { id }, context) => {
      if (!context.user) {
        throw new Error("You need to be logged in!");
      }

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: id } },
        { new: true }
      );

      return updatedUser;
    },
  },
};

module.exports = resolvers;
