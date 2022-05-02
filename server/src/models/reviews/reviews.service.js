const fs = require('fs');

module.exports = {
  getPagination({ limit, page }) {
    const DEFAULT_REVIEWS_LIMIT = 10;
    const DEFAULT_REVIEWS_PAGE = 1;
    const REVIEWS_LIMIT = +limit || DEFAULT_REVIEWS_LIMIT;
    const REVIEWS_PAGE = +page || DEFAULT_REVIEWS_PAGE;

    return { limit: REVIEWS_LIMIT, skip: (REVIEWS_PAGE - 1) * REVIEWS_LIMIT };
  },
};
