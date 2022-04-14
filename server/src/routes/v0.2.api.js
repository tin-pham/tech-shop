const express = require('express');

const phonesRouter = require('@routes/phones/phones.router');

const api = express.Router();

api.use('/v0.2/phones', phonesRouter);

module.exports = api;
