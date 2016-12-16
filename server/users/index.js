const express = require('express');
const router = express.Router();
const usersController = require('./users_controller');
const {authorize} = require('../utils/authorization');

router.post('/', usersController.postUsers);
router.get('/', authorize(['admin', 'user_manager']), usersController.getUsers);

module.exports = router;
