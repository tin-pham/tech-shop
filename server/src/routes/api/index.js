// API version
const { Router } = require('express');
const api = require('./versions/v0.3.api');

const apiRouter = Router();

global.apiVer = 'v0.3';

apiRouter.use(`/v0.3`, api);

module.exports = apiRouter;
