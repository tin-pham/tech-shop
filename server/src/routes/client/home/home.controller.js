module.exports = {
  getHomePage(req, res) {
    return res.render('templates/home', {
      username: res.locals.user?.username,
    });
  },
};
