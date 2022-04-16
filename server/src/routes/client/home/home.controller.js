// TODO: Use ver in app.js
const apiVer = 'v0.2';

module.exports = {
  getHomePage(req, res) {
    return res.render('home', { apiVer });
  },
};
