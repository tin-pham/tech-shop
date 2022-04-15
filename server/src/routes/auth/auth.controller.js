const { validationResult } = require('express-validator');

const { createUser } = require('@models/users/users.model');

module.exports = {
  async httpSignIn(req, res) {
    const { username, password } = req.body;

    // TODO: Add sign in functionality
    console.log(username, password);

    return res.status(200).send('Signed in');
  },
  async httpSignUp(req, res) {
    const { username, password } = req.body;

    try {
      const newUser = await createUser({ username, password });
      return res.status(201).json(newUser);
    } catch (errors) {
      return res.status(400).json(errors);
    }
  },
};
