const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
// Create routes for user authentication

const userControllers = require('../controllers/userController')
router.get('/authentication', userControllers.authentication);
router.post('/signup', userControllers.signup);
router.post('/login', userControllers.login);
router.post('/logout', auth, userControllers.logout)

module.exports = router;