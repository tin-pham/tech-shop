const express = require('express');

const smartphonesRouter = require('@routes/smartphones/smartphones.router');

const api = express.Router();

api.use('/v0.1/smartphones', smartphonesRouter);

module.exports = api;
