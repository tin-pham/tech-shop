const { createUser } = require('@models/users/users.model');
const Users = require('@models/users/users.mongo');

const { createToken } = require('@services/jwt');

const maxAge = 1 * 24 * 60 * 60;
module.exports = {
  async httpLogIn(req, res) {
    const { username, password } = req.body;

    try {
      const user = await Users.login({ username, password });

      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });

      return res.status(200).json({ id: user._id });
    } catch (errors) {
      // TODO: Better error handling
      return res.status(401).json({ error: errors.message });
    }
  },
  async httpSignUp(req, res) {
    const { username, password } = req.body;
    const maxAge = 1 * 24 * 60 * 60 * 1000;

    try {
      const newUser = await createUser({ username, password });

      const token = createToken(newUser._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });

      return res.status(201).json(newUser._id);
    } catch (errors) {
      return res.status(400).json(errors);
    }
  },
  getSignUpPage(req, res) {
    return res.render('templates/signup', { script: '/js/signup.client.js' });
  },
  getLogInPage(req, res) {
    return res.render('templates/login', { script: '/js/login.client.js' });
  },
};
