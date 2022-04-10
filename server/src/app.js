const express = require('express');

const smartphonesRouter = require('@routes/smartphones.router');

const app = express();

app.use('api/v1/smartphones', smartphonesRouter);

module.exports = app;
