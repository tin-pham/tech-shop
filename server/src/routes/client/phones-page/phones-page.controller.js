module.exports = {
  getGetPhonesPage(req, res) {
    return res.render('templates/phones/phones-get', {
      username: res.locals.user?.username,
      apiVer: global.apiVer,
      script: '/js/get.client.js',
    });
  },
  getPostPhonePage(req, res) {
    return res.render('templates/phones/phone-post', {
      username: res.locals.user?.username,
      apiVer: global.apiVer,
      script: '/js/post.client.js',
    });
  },
  getUpdatePhonePage(req, res) {
    return res.render('templates/phones/phone-update', {
      username: res.locals.user?.username,
      apiVer: global.apiVer,
      script: '/js/phones/phone-update.client.js',
    });
  },
  getDeletePhonePage(req, res) {
    return res.render('templates/phones/phone-delete', {
      username: res.locals.user?.username,
      apiVer: global.apiVer,
      script: '/js/phones/phone-delete.client.js',
    });
  },
};
