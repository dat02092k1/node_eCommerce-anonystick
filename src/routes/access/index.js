'use strict';

const express = require('express');
const accessController = require('../../controllers/access.controller');
const { asyncHandler } = require('../../auth/checkAuth');

const router = express.Router();

// signUp
router.post('/shop/signUp', (accessController.signUp));
// signin
router.post('/shop/login', (accessController.login));

module.exports = router;