const User = require('@models/users/users.model');

module.exports = {
  async seedUsers() {
    return User.seedUsers();
  },
};
