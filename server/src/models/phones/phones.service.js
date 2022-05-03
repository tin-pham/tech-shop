module.exports = {
  getFilter(query) {
    const {
      brand = '.*',
      priceFrom = 0,
      priceTo = Infinity,
      quantity = 0,
    } = query;

    const brandName = new RegExp(`${brand}`);

    const filter = {
      brand: { $regex: brandName, $options: 'i' },
      price: { $gte: priceFrom, $lte: priceTo },
      quantity: { $gte: quantity },
    };

    return filter;
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
