module.exports = {
  getGetReviewsPage(req, res) {
    return res.render('templates/reviews/reviews-get', {
      username: res.locals.user?.username,
      apiVer: global.apiVer,
      endpoint: 'reviews',
      script: '/js/get.client.js',
    });
  },

  getPostReviewPage(req, res) {
    return res.render('templates/reviews/review-post', {
      username: res.locals.user?.username,
      apiVer: global.apiVer,
      endpoint: 'reviews',
      script: '/js/post.client.js',
    });
  },
};
