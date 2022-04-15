const express = require('express');

const { httpGetAllUsers } = require('./users.controller');

const router = express.Router();

router.get('/', httpGetAllUsers);

module.exports = router;
