const { Router } = require('express');

const { httpGetReviews, httpPostReview } = require('./reviews.controller');

const router = Router();

router.get('/', httpGetReviews);
router.post('/', httpPostReview);

module.exports = router;
