const { Router } = require('express');

const { getHomePage } = require('./home.controller');

const router = Router();

router.get('/', getHomePage);

module.exports = router;
