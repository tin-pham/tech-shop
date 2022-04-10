const express = require('express');

const { httpGetSmartphones } = require('./smartphones.controller');

const router = express.Router();

router.get('/', httpGetSmartphones);

module.exports = router;
