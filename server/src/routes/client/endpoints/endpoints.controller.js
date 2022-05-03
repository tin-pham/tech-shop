module.exports = {
  getEndpointsPage(req, res) {
    return res.render('templates/endpoints/endpoints', {
      username: res.locals.user?.username,
      apiVer: global.apiVer,
    });
  },

  getPhoneEndpointsPage(req, res) {
    return res.render('templates/methods', {
      username: res.locals.user?.username,
      apiVer: global.apiVer,
      endpoint: 'phones',
    });
  },

  getReviewEndpointsPage(req, res) {
    return res.render('templates/methods', {
      username: res.locals.user?.username,
      apiVer: global.apiVer,
      endpoint: 'reviews',
    });
  },

  getUserEndpointsPage(req, res) {
    return res.render('templates/methods', {
      username: res.locals.user?.username,
      apiVer: global.apiVer,
      endpoint: 'users',
    });
  },
};
