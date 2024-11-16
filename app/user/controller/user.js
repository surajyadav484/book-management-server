const UserService = require("../service/user");

class User {
  constructor() {
    this.userService = new UserService();
  }

  addUser = async (req, res) => {
    try {
      const user = req.body;
      await this.userService.addUser(user);
      res.status(201).json({ message: "User added successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = new User();
