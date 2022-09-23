const express = require('express');
const router = express.Router();

// Create routes for user authentication

const userControllers = require('../controllers/userController')
router.get('/authentication', userControllers.authentication);
router.post('/signup', userControllers.signup);
router.post('/login', userControllers.login);

module.exports = router