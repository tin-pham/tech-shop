const jwt = require('jsonwebtoken');

const Users = require('@models/users/users.mongo');

module.exports = {
  auth(req, res, next) {
    const token = req.cookies.jwt;

    if (!token) {
      return res.redirect('/login');
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        return res.redirect('/login');
      }
      console.log(decodedToken);
      next();
    });
  },

  checkCurrentUser(req, res, next) {
    const token = req.cookies.jwt;

    if (!token) {
      res.locals.user = null;
      return next();
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
      } else {
        const user = await Users.findById(decodedToken.id);
        res.locals.user = user;
      }

      return next();
    });
  },
};
