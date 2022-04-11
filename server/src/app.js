const express = require('express');
const morgan = require('morgan');

const smartphonesRouter = require('@routes/smartphones/smartphones.router');

const app = express();
app.use(express.json());
app.use(morgan('combined'));

app.use('/api/v1/smartphones', smartphonesRouter);

module.exports = app;
