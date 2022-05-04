const { Router } = require('express');

const router = Router();
const {
  getGetReviewsPage,
  getPostReviewPage,
} = require('./reviews-page.controller');

const {
  getReviewEndpointsPage,
} = require('@routes/client/endpoints/endpoints.controller');

router.get('/', getReviewEndpointsPage);
router.get('/get', getGetReviewsPage);
router.get('/post', getPostReviewPage);

module.exports = router;
