const express = require('express');
const morgan = require('morgan');

const smartphonesRouter = require('@routes/smartphones/smartphones.router');

const v1Api = require('@routes/v1.api');

const app = express();
app.use(express.json());
app.use(morgan('combined'));

app.use('/api/v1', v1Api);

module.exports = app;
