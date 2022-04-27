const { createUser } = require('@models/users/users.model');
const { createToken } = require('@services/jwt');
const Users = require('@models/users/users.mongo');

const oneDayInMiliSecond = 1 * 24 * 60 * 60 * 1000;
module.exports = {
  async httpLogIn(req, res) {
    const { username, password } = req.body;

    try {
      const user = await Users.login({ username, password });

      const token = createToken(user._id);
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: oneDayInMiliSecond,
        secure: false,
      });

      return res.status(200).json({ id: user._id });
    } catch (errors) {
      // TODO: Better error handling
      return res.status(401).json({ error: errors.message });
    }
  },
  async httpSignUp(req, res) {
    const { username, password } = req.body;

    try {
      const newUser = await createUser(req.body);

      const token = createToken(newUser._id);
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: oneDayInMiliSecond,
        secure: false,
      });

      return res
        .status(201)
        .json({ id: newUser._id, username: newUser.username });
    } catch (errors) {
      return res.status(400).json(errors);
    }
  },
  httpLogOut(req, res) {
    res.cookie('jwt', '', { maxAge: 1 });
    return res.redirect('/');
  },
};
