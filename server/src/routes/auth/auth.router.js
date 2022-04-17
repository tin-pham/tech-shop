const { Router } = require('express');

const {
  httpSignIn,
  httpSignUp,
  getSignUpPage,
  getSignInPage,
} = require('./auth.controller');

const router = Router();

router.get('/signup', getSignUpPage);
router.post('/signup', httpSignUp);

router.get('/signin', getSignInPage);
router.post('/signin', httpSignIn);

module.exports = router;
