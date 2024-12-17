const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Rute publice
router.post('/register', userController.register);
router.post('/login', userController.login);

// Rute protejate
router.get('/profile', auth, userController.getProfile);

module.exports = router;