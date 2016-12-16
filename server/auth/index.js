const express = require('express');
const router = express.Router();
const authController = require('./auth_controller');

router.post('/access_token', authController.postAccessToken);

module.exports = router;