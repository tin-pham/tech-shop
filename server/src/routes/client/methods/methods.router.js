const { Router } = require('express');
const router = Router();

const { getMethodsPage } = require('./methods.controller');

router.get('/', getMethodsPage);

module.exports = router;
