const { Router } = require('express');

const {
  httpGetReviews,
  httpGetReview,
  httpPostReview,
} = require('./reviews.controller');

const router = Router();

router.get('/', httpGetReviews);
router.get('/:id', httpGetReview);
router.post('/', httpPostReview);

module.exports = router;
