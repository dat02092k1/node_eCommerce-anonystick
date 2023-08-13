'use strict';

const express = require('express');
const accessController = require('../../controllers/access.controller');
const { asyncHandler } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtils');

const router = express.Router();

// signUp
router.post('/shop/signUp', (accessController.signUp));
// signin
router.post('/shop/login', (accessController.login));

// authentication
router.use(authentication);
// logout
router.post('/shop/logout', (accessController.logout));

module.exports = router;