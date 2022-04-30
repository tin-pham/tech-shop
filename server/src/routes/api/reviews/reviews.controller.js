const Review = require('@models/reviews/reviews.model');

module.exports = {
  async httpGetReviews(req, res) {
    const { reviewsPage, reviewsLimit } = req.query;

    const filters = {
      page: reviewsPage,
      limit: reviewsLimit,
    };
    return res.status(200).json(await Review.getReviews(filters));
  },

  async httpPostReview(req, res) {
    const newReview = await Review.addReview(req.body);

    return res.status(201).json(newReview);
  },
};
