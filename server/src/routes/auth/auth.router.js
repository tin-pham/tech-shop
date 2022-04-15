const { Router } = require('express');

const { httpSignIn, httpSignUp } = require('./auth.controller');

const router = Router();

router.post('/signin', httpSignIn);
router.post('/signup', httpSignUp);

module.exports = router;
