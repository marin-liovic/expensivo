const express = require('express');
const router = express.Router();
const usersController = require('./users_controller');
const {authorize} = require('../utils/authorization');

router.post('/', usersController.postUsers);
router.get('/', authorize(['admin', 'user_manager']), usersController.getUsers);
router.get('/:id', authorize(), usersController.getUser);
router.delete('/:id', authorize(['admin', 'user_manager']), usersController.deleteUser);
router.put('/:id', authorize(['admin', 'user_manager']), usersController.putUser);

module.exports = router;
