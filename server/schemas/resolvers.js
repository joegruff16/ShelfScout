// Import User Model
const { User } = require("../models/User");

const resolvers = {
  Query: {
    getSingleUser: async (_, { id, username }) => {
      const findUser = await User.findOne({
        $or: [{ _id: id }, { username: username }],
      });
      return findUser;
    },
  },
};

module.exports = resolvers;
