const { getAllPhones } = require('@models/phones/phones.model');

module.exports = {
  getMethodsPage(req, res) {
    return res.render('templates/methods/methods', {
      username: res.locals.user?.username,
    });
  },
  getGetMethodPage(req, res) {
    return res.render('templates/methods/get', {
      username: res.locals.user?.username,
      apiVer: global.apiVer,
      script: '/js/get.client.js',
    });
  },
  getPostMethodPage(req, res) {
    return res.render('templates/methods/post', {
      username: res.locals.user?.username,
      apiVer: global.apiVer,
      script: '/js/phones.client.js',
    });
  },
  getUpdateMethodPage(req, res) {
    return res.render('templates/methods/update', {
      username: res.locals.user?.username,
      apiVer: global.apiVer,
      script: '/js/update.client.js',
    });
  },
};
