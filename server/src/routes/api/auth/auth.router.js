const { Router } = require('express');

const { httpLogIn, httpSignUp, httpLogOut } = require('./auth.controller');

const router = Router();

router.post('/signup', httpSignUp);
router.post('/login', httpLogIn);
router.get('/logout', httpLogOut);

module.exports = router;
