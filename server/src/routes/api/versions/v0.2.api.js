const express = require('express');

const phonesRouter = require('@api/phones/phones.router');
const usersRouter = require('@api/users/users.router');
const authRouter = require('@api/auth/auth.router');
const reviewsRouter = require('@api/reviews/reviews.router');

const api = express.Router();

api.use(`/v0.2`, authRouter);
api.use(`/v0.2/phones`, phonesRouter);
api.use(`/v0.2/users`, usersRouter);
api.use(`/v0.2/reviews`, reviewsRouter);

module.exports = api;
