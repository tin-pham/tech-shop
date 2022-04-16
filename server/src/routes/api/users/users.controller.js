const { getAllUsers } = require('@models/users/users.model');

module.exports = {
  async httpGetAllUsers(req, res) {
    return res.status(200).json(await getAllUsers(req.query));
  },
};
