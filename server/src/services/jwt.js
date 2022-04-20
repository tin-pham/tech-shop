const jwt = require('jsonwebtoken');

const maxAge = 1 * 24 * 60 * 60;

function createToken(id) {
  const token = jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });

  return token;
}

module.exports = {
  createToken,
};
