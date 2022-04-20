module.exports = {
  getMethodsPage(req, res) {
    return res.render('templates/methods/methods', {
      username: res.locals.user?.username,
    });
  },
  getGetMethodsPage(req, res) {
    return res.render('templates/methods/get', {
      username: res.locals.user?.username,
      apiVer: global.apiVer,
      script: '/js/get.client.js',
    });
  },
  getPostMethodsPage(req, res) {
    return res.render('templates/methods/post', {
      username: res.locals.user?.username,
      apiVer: global.apiVer,
      script: '/js/phones.client.js',
    });
  },
};
