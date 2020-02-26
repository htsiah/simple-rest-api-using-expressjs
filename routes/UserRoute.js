const express = require('express');

const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/', UserController.getUsers);

router.get('/:id', UserController.getUserById);

router.post('/', UserController.createUser);

router.patch('/:id', UserController.updateUserById);

router.delete('/:id', UserController.deleteUserById);

module.exports = router;
