const { Router } = require('express');

const {
  httpLogIn,
  httpSignUp,
  httpLogOut,
  getSignUpPage,
  getLogInPage,
} = require('./auth.controller');

const router = Router();

router.get('/signup', getSignUpPage);
router.post('/signup', httpSignUp);

router.get('/login', getLogInPage);
router.post('/login', httpLogIn);

router.get('/logout', httpLogOut);

module.exports = router;
