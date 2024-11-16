const User = require("../../../models/user");

class UserService {
  addUser = async (user) => {
    try {
      await User.create(user);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = UserService;
