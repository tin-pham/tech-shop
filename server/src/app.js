const express = require('express');
const morgan = require('morgan');

const vTestApi = require('@routes/v0.2.api');
const authRouter = require('@routes/auth/auth.router');

const app = express();
app.use(express.json());
app.use(morgan('combined'));
app.set('json spaces', 2);

app.use(authRouter);
app.use('/api', vTestApi);

module.exports = app;
