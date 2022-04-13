function getPagination(query) {
  const DEFAULT_LIMIT = 0;
  const DEFAULT_PAGE = 1;

  const page = +query.page || DEFAULT_PAGE;
  const limit = +query.limit || DEFAULT_LIMIT;
  const skip = (page - 1) * limit;

  return {
    limit,
    skip,
  };
}

module.exports = {
  getPagination,
};
