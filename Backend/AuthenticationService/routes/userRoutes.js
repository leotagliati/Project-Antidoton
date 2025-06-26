const express = require('express');
const router = express.Router();
const { getUsers, updateUserRole, deleteUser } = require('../controllers/userController');

router.get('/', getUsers);
router.patch('/:username', updateUserRole);
router.delete('/:username', deleteUser);

module.exports = router;
