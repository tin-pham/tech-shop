const express = require('express');

const {
  httpGetSmartphones,
  httpPostSmartphones,
  httpDeleteSmartphone,
} = require('./smartphones.controller');

const router = express.Router();

router.get('/', httpGetSmartphones);
router.post('/', httpPostSmartphones);
router.delete('/:id', httpDeleteSmartphone);

module.exports = router;
