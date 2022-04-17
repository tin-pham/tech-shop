module.exports = {
  getHomePage(req, res) {
    return res.render('templates/home', { apiVer: global.apiVer });
  },
};
