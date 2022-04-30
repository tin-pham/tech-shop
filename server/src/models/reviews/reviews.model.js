const path = require('path');
const ReviewModel = require('./reviews.mongo');
const PhoneModel = require('@models/phones/phones.mongo');
const Phone = require('@models/phones/phones.model');
const { getPagination } = require('@services/query');
const { read } = require('@services/utils');

async function getReviews(query) {
  const { limit, skip } = getPagination({
    limit: query.limit,
    page: query.page,
  });

  return await ReviewModel.find({}, { __v: 0 }).skip(skip).limit(limit);
}

// TODO: Generilize the find product not just in phone
async function addReview(review) {
  const newReview = await ReviewModel.create(review);

  const phone = await PhoneModel.findOne({ _id: review.product.id });
  phone.reviews.push(newReview._id);
  await phone.save();

  return newReview;
}

async function seedReviewsToProduct(product) {
  await read(path.resolve('data/reviews.json'), async function(reviewData) {
    reviewData.forEach(async (review) => {
      if (!(await isReviewExist(review))) {
        // TODO: It should be product not phone

        const newReview = await addReview(review);
        await Phone.addReviewToPhone(newReview, product);
      }
    });
  });
}

async function isReviewExist(review) {
  return await ReviewModel.findOne({ _id: review._id });
}
module.exports = {
  getReviews,
  addReview,
  seedReviewsToProduct,
};
