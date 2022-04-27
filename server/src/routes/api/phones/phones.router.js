const express = require('express');

const {
  httpGetAllPhones,
  httpGetPhone,
  httpPostPhone,
  httpPutPhone,
  httpDeletePhone,
} = require('./phones.controller');

const router = express.Router();

router.get('/', httpGetAllPhones);
router.get('/:id', httpGetPhone);
router.post('/', httpPostPhone);
router.put('/:id', httpPutPhone);
router.delete('/:id', httpDeletePhone);

module.exports = router;
