const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const chatController = require('../controllers/chatController');

// Create chat session
router.post('/', authMiddleware, chatController.createSession);

// Get all sessions for user
router.get('/', authMiddleware, chatController.getUserSessions);

// Get single session
router.get('/:id', authMiddleware, chatController.getSessionById);

// Add message to chat
router.post('/:id/messages', authMiddleware, chatController.addMessageToChat);

// Rename chat
router.patch('/:id', authMiddleware, chatController.renameChat);

// Delete chat
router.delete('/:id', authMiddleware, chatController.deleteChat);

module.exports = router;
