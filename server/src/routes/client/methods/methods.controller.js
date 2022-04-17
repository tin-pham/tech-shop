module.exports = {
  getMethodsPage(req, res) {
    return res.render('templates/methods/methods');
  },
  getGetMethodsPage(req, res) {
    return res.render('templates/methods/get', {
      apiVer: global.apiVer,
    });
  },
  getPostMethodsPage(req, res) {
    return res.render('templates/methods/post', {
      apiVer: global.apiVer,
      script: '/js/phones.client.js',
    });
  },
};
