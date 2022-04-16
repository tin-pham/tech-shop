const express = require('express');

const {
  httpGetAllSmartphones,
  httpGetSmartphone,
  httpPostSmartphone,
  httpDeleteSmartphone,
} = require('./smartphones.controller');

const router = express.Router();

router.get('/', httpGetAllSmartphones);
router.get('/:id', httpGetSmartphone);
router.post('/', httpPostSmartphone);
router.delete('/:id', httpDeleteSmartphone);

module.exports = router;
