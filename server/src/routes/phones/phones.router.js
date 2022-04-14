const express = require('express');

const {
  httpGetAllPhones,
  httpGetPhone,
  httpPostPhone,
  httpDeletePhone,
} = require('./phones.controller');

const router = express.Router();

router.get('/', httpGetAllPhones);
router.get('/:id', httpGetPhone);
router.post('/', httpPostPhone);
router.delete('/:id', httpDeletePhone);

module.exports = router;
