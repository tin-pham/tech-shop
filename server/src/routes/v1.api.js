const express = require('express');

const smartphonesRouter = require('@routes/smartphones/smartphones.router');

const api = express.Router();

api.use('/smartphones', smartphonesRouter);

module.exports = api;
