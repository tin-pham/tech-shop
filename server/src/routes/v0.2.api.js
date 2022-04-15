const express = require('express');

const phonesRouter = require('@routes/phones/phones.router');
const usersRouter = require('@routes/users/users.router');

const api = express.Router();

api.use(`/v0.2/phones`, phonesRouter);
api.use(`/v0.2/users`, usersRouter);

module.exports = api;
