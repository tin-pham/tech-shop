const { Router } = require('express');
const router = Router();

const {
  getMethodsPage,
  getGetMethodPage,
  getPostMethodPage,
  getUpdateMethodPage,
  getDeleteMethodPage,
} = require('./methods.controller');

router.get('/', getMethodsPage);
router.get('/get', getGetMethodPage);
router.get('/post', getPostMethodPage);
router.get('/update', getUpdateMethodPage);
router.get('/delete', getDeleteMethodPage);

module.exports = router;
