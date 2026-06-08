const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Register
router.post('/signup', authController.signup);

// Login
router.post('/login', authController.login);

// Protected profile route - returns logged-in user data
// GET /api/auth/profile
router.get('/profile', authMiddleware, (req, res) => {
	// authMiddleware attaches `req.user` (without password)
	res.json({ user: req.user });
});

module.exports = router;
