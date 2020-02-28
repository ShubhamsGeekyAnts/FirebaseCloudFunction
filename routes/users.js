const express = require('express');

const { addUser, deleteUser, getUsers, updateUser} = require('../controllers/users.controller');

const router = express.Router();

router.get('/:id?', getUsers);

router.post('/', addUser);

router.get('/:id/delete', deleteUser);

router.post('/:id/update', updateUser);


module.exports = router;
