const { Router } = require('express');

const clientRouter = Router();

const homeRouter = require('./home/home.router');
const methodsRouter = require('./methods/methods.router');

clientRouter.use('/', homeRouter);
clientRouter.use('/methods', methodsRouter);

module.exports = clientRouter;
