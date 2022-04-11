const express = require('express');

const smartphonesRouter = require('@routes/smartphones/smartphones.router');

const app = express();

app.use(express.json());

app.use('/api/v1/smartphones', smartphonesRouter);

module.exports = app;
