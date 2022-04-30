const fs = require('fs');
const Phone = require('@models/phones/phones.model');

module.exports = {
  getPagination({ limit, page }) {
    const DEFAULT_REVIEWS_LIMIT = 10;
    const DEFAULT_REVIEWS_PAGE = 1;
    const REVIEWS_LIMIT = +limit || DEFAULT_REVIEWS_LIMIT;
    const REVIEWS_PAGE = +page || DEFAULT_REVIEWS_PAGE;

    return { limit: REVIEWS_LIMIT, skip: (REVIEWS_PAGE - 1) * REVIEWS_LIMIT };
  },
  writeReviewToProduct(file, product) {
    const fileStream = fs.createReadStream(file);

    fileStream.on('error', (errors) => {
      console.error(errors);
    });

    fileStream.on('data', async (chunk) => {
      chunk.forEach((piece) => {
        // phone update reviews
        const reviews = Phone.update(product._id, piece);
      });
    });
  },
};
