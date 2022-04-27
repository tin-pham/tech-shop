const { Router } = require('express');
const router = Router();

const { getSignUpPage, getLoginPage } = require('./auth-page.controller');

router.get('/signup', getSignUpPage);
router.get('/login', getLoginPage);

module.exports = router;
