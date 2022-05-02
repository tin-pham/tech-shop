const path = require('path');
const ReviewModel = require('./reviews.mongo');
const Phone = require('@models/phones/phones.model');
const { getPagination } = require('@services/query');
const { read } = require('@services/utils');

async function getOneWithId(id) {
  return await ReviewModel.findOne({ _id: id });
}

async function getReviews(query) {
  const { limit, skip } = getPagination({
    limit: query.limit,
    page: query.page,
  });

  return await ReviewModel.find({}, { __v: 0 }).skip(skip).limit(limit);
}

// TODO: Generilize the find product not just in phone
async function addReviewToProduct(review, product) {
  if (!(await isReviewExist(review))) {
    const phone = await Phone.getPhoneById(product._id);
    const newReview = await ReviewModel.create(review);
    // TODO: Should generilize the phone => product
    phone.reviews.push(newReview);
    phone.save();

    return newReview;
  } else {
    return review;
  }
}

async function addReview(review) {
  if (!(await isReviewExist(review))) {
    return await ReviewModel.create(review);
  }
}

async function seedReviewsToProduct() {
  return read(path.resolve('data/reviews.json'), function(reviewData) {
    return reviewData.map(async (review) => {
      // TODO: It should be product not phone
      return addReview(review);
    });
  });
}

async function isReviewExist(review) {
  return await getOneWithId(review._id);
}

async function deleteReview(id) {
  const review = await getOneWithId(id);
  await ReviewModel.deleteOne({ _id: id });

  return review;
}

async function deleteMany(reviews) {
  await ReviewModel.deleteMany({ _id: { $in: reviews } });
}

module.exports = {
  getOneWithId,
  addReview,
  getReviews,
  addReviewToProduct,
  deleteReview,
  deleteMany,
  seedReviewsToProduct,
};
