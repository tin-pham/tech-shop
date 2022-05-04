const { Router } = require('express');

const {
  getEndpointsPage,
  getUserEndpointsPage,
} = require('./endpoints.controller');

const phonePageRouter = require('@routes/client/phones-page/phones-page.router');
const reviewPageRouter = require('@routes/client/reviews-page/reviews-page.router');

const router = Router();

router.get('/', getEndpointsPage);
router.use('/phones', phonePageRouter);
router.use('/reviews', reviewPageRouter);
router.get('/users', getUserEndpointsPage);

module.exports = router;
