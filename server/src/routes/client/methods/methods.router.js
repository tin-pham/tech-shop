const { Router } = require('express');
const router = Router();

const {
  getMethodsPage,
  getGetMethodsPage,
  getPostMethodsPage,
} = require('./methods.controller');

router.get('/', getMethodsPage);
router.get('/get', getGetMethodsPage);
router.get('/post', getPostMethodsPage);

module.exports = router;
