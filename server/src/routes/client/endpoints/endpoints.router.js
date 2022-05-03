const { Router } = require('express');

const {
  getEndpointsPage,
  getUserEndpointsPage,
  getReviewEndpointsPage,
} = require('./endpoints.controller');

const phonePageRouter = require('@routes/client/phones-page/phones-page.router');

const router = Router();

router.get('/', getEndpointsPage);
router.use('/phones', phonePageRouter);
router.get('/reviews', getReviewEndpointsPage);
router.get('/users', getUserEndpointsPage);

module.exports = router;
