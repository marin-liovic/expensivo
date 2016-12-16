const express = require('express');
const router = express.Router();
const meController = require('./me_controller');
const {authorize} = require('../utils/authorization');

router.get('/', authorize(), meController.getMe);

module.exports = router;
