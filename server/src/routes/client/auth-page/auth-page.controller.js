module.exports = {
  getSignUpPage(req, res) {
    return res.render('templates/signup', { script: '/js/signup.client.js' });
  },
  getLoginPage(req, res) {
    return res.render('templates/login', { script: '/js/login.client.js' });
  },
};
