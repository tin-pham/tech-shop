const express = require('express');

const smartphonesRouter = require('@api/smartphones/smartphones.router');

const api = express.Router();

api.use('/v0.1/smartphones', smartphonesRouter);

module.exports = api;
