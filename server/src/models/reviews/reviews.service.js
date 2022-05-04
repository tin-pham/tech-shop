module.exports = {
  getFilters(query) {
    let { minRating = 1, productId } = query;

    console.log(productId);
    const filters = {
      'product._id': productId,
      rating: { $gte: minRating },
    };

    Object.keys(filters).forEach((key) => {
      (filters[key] === '' || filters[key] === undefined) &&
        delete filters[key];
    });

    console.log(filters);

    return filters;
  },
  getPagination({ limit, page }) {
    const DEFAULT_REVIEWS_LIMIT = 10;
    const DEFAULT_REVIEWS_PAGE = 1;
    const REVIEWS_LIMIT = +limit || DEFAULT_REVIEWS_LIMIT;
    const REVIEWS_PAGE = +page || DEFAULT_REVIEWS_PAGE;

    return { limit: REVIEWS_LIMIT, skip: (REVIEWS_PAGE - 1) * REVIEWS_LIMIT };
  },
};
