const ChatSession = require('../models/ChatSession');

// Create a new chat session (optionally with an initial message)
exports.createSession = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, initialMessage } = req.body;

    const session = new ChatSession({ userId, title: title || 'New Chat' });

    if (initialMessage && initialMessage.trim()) {
      session.messages.push({ role: 'user', content: initialMessage.trim() });
    }

    await session.save();

    return res.status(201).json(session);
  } catch (err) {
    console.error('Create chat session error:', err);
    return res.status(500).json({ message: 'Failed to create chat session' });
  }
};

// Get all chat sessions for the logged-in user
exports.getUserSessions = async (req, res) => {
  try {
    const userId = req.user._id;
    const sessions = await ChatSession.find({ userId }).sort({ updatedAt: -1 });
    return res.json(sessions);
  } catch (err) {
    console.error('Get user sessions error:', err);
    return res.status(500).json({ message: 'Failed to fetch chat sessions' });
  }
};

// Get a single chat session by id (must belong to the user)
exports.getSessionById = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const session = await ChatSession.findById(id);
    if (!session) return res.status(404).json({ message: 'Chat session not found' });
    if (session.userId.toString() !== userId.toString()) return res.status(403).json({ message: 'Forbidden' });

    return res.json(session);
  } catch (err) {
    console.error('Get session error:', err);
    return res.status(500).json({ message: 'Failed to fetch chat session' });
  }
};

// Add a message to an existing chat session
exports.addMessageToChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { role, content } = req.body;

    if (!role || !content || !content.trim()) {
      return res.status(400).json({ message: 'Role and content are required' });
    }

    const session = await ChatSession.findById(id);
    if (!session) return res.status(404).json({ message: 'Chat session not found' });
    if (session.userId.toString() !== userId.toString()) return res.status(403).json({ message: 'Forbidden' });

    session.messages.push({ role, content: content.trim(), timestamp: new Date() });
    await session.save();

    return res.json(session);
  } catch (err) {
    console.error('Add message error:', err);
    return res.status(500).json({ message: 'Failed to add message' });
  }
};

// Rename the chat session
exports.renameChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { title } = req.body;

    if (typeof title !== 'string' || !title.trim()) return res.status(400).json({ message: 'Title is required' });

    const session = await ChatSession.findById(id);
    if (!session) return res.status(404).json({ message: 'Chat session not found' });
    if (session.userId.toString() !== userId.toString()) return res.status(403).json({ message: 'Forbidden' });

    session.title = title.trim();
    await session.save();

    return res.json(session);
  } catch (err) {
    console.error('Rename chat error:', err);
    return res.status(500).json({ message: 'Failed to rename chat' });
  }
};

// Delete a chat session
exports.deleteChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const session = await ChatSession.findById(id);
    if (!session) return res.status(404).json({ message: 'Chat session not found' });
    if (session.userId.toString() !== userId.toString()) return res.status(403).json({ message: 'Forbidden' });

    await session.deleteOne();

    return res.json({ message: 'Chat session deleted' });
  } catch (err) {
    console.error('Delete chat error:', err);
    return res.status(500).json({ message: 'Failed to delete chat session' });
  }
};
