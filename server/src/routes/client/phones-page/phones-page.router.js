const { Router } = require('express');
const router = Router();

const {
  getGetPhonesPage,
  getPostPhonePage,
  getUpdatePhonePage,
  getDeletePhonePage,
} = require('./phones-page.controller');

const {
  getPhoneEndpointsPage,
} = require('@routes/client/endpoints/endpoints.controller');

router.get('/', getPhoneEndpointsPage);
router.get('/get', getGetPhonesPage);
router.get('/post', getPostPhonePage);
router.get('/update', getUpdatePhonePage);
router.get('/delete', getDeletePhonePage);

module.exports = router;
