const { Router } = require('express');

const {
  httpLogIn,
  httpSignUp,
  getSignUpPage,
  getLogInPage,
} = require('./auth.controller');

const router = Router();

router.get('/signup', getSignUpPage);
router.post('/signup', httpSignUp);

router.get('/login', getLogInPage);
router.post('/login', httpLogIn);

module.exports = router;
