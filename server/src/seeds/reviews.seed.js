const Review = require('@models/reviews/reviews.model');
const Phone = require('@models/phones/phones.model');

module.exports = {
  async seedReviews() {
    return await Review.seedReviewsToProduct();
  },
};
