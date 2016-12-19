const express = require('express');
const router = express.Router();
const authController = require('./auth_controller');
const authorize = require('../utils/authorization').authorize;

router.post('/access_token', authController.postAccessToken);
router.delete('/access_token/:value', authorize(), authController.deleteAccessToken);

module.exports = router;