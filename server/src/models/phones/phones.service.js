module.exports = {
  getFilter(query) {
    const { priceFrom = 0, priceTo = Infinity, quantity = 0, category } = query;

    const phoneName = new RegExp(query.name, 'i');
    const filters = {
      price: { $gte: priceFrom, $lte: priceTo },
      quantity: { $gte: quantity },
      name: phoneName,
      category,
    };
    Object.keys(filters).forEach((key) => {
      (filters[key] === '' || filters[key] === undefined) &&
        delete filters[key];
    });

    return filters;
  },

  getPagination(query) {
    const DEFAULT_LIMIT = 0;
    const DEFAULT_PAGE = 1;

    const page = +query.page || DEFAULT_PAGE;
    const limit = +query.limit || DEFAULT_LIMIT;
    const skip = (page - 1) * limit;

    return {
      limit,
      skip,
    };
  },
};
