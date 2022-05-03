const { Router } = require('express');

const clientRouter = Router();

const homeRouter = require('./home/home.router');
//const methodsRouter = require('./methods/methods.router');
const authPageRouter = require('./auth-page/auth-page.router');
const endPointRouter = require('./endpoints/endpoints.router');

const { auth } = require('@middlewares/auth.middleware');

clientRouter.use(homeRouter);
clientRouter.use(authPageRouter);
//clientRouter.use('/methods', auth, methodsRouter);
clientRouter.use('/endpoints', auth, endPointRouter);

module.exports = clientRouter;
