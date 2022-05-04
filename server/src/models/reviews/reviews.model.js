const path = require('path');
const mongoose = require('mongoose');

const ReviewModel = require('./reviews.mongo');
const Phone = require('@models/phones/phones.model');
const ReviewServices = require('./reviews.service');
const { formatErrors, read } = require('@services/utils');

async function getOneWithId(id) {
  return await ReviewModel.findOne({ _id: id });
}

async function getReviews(query) {
  const { limit, skip } = ReviewServices.getPagination({
    limit: query.reviewsLimit,
    page: query.reviewsPage,
  });

  const filters = ReviewServices.getFilters(query);

  return await ReviewModel.find(filters, { __v: 0 }).skip(skip).limit(limit);
}

async function addReview(review) {
  try {
    if (!(await isReviewExist(review))) {
      console.log(review);
      return await ReviewModel.create(review);
    }
  } catch (errors) {
    return formatErrors(errors);
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
  deleteReview,
  deleteMany,
  seedReviewsToProduct,
};
