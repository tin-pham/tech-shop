const { Router } = require('express');

const clientRouter = Router();

const homeRouter = require('./home/home.router');
const methodsRouter = require('./methods/methods.router');

const { auth } = require('@middlewares/auth.middleware');

clientRouter.use('/', homeRouter);
clientRouter.use('/methods', auth, methodsRouter);

module.exports = clientRouter;
