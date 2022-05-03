const express = require('express');

const phonesRouter = require('@api/phones/phones.router');
const usersRouter = require('@api/users/users.router');
const authRouter = require('@api/auth/auth.router');
const reviewsRouter = require('@api/reviews/reviews.router');
const { auth } = require('@middlewares/auth.middleware');

const api = express.Router();

api.use(`/`, authRouter);
api.use(`/phones`, auth, phonesRouter);
api.use(`/users`, auth, usersRouter);
api.use(`/reviews`, auth, reviewsRouter);

module.exports = api;
