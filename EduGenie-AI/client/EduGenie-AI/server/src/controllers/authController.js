const jwt = require('jsonwebtoken');
const User = require('../models/User');

console.log("JWT_SECRET =", process.env.JWT_SECRET);

// Helper to generate JWT
function generateToken(userId) {
	return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// POST /api/auth/signup
exports.signup = async (req, res) => {
	console.log("SIGNUP START");
	console.log("BODY:", req.body);
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(400).json({ message: 'Name, email and password are required' });
		}

		console.log("CHECKING USER");
		const existing = await User.findOne({ email });
		if (existing) {
			return res.status(400).json({ message: 'User already exists with this email' });
		}

		console.log("CREATING USER");
		const user = new User({ name, email, password });

		console.log("SAVING USER");
		await user.save();

		console.log("GENERATING TOKEN");
		const token = generateToken(user._id);

		res.status(201).json({
			user: { id: user._id, name: user.name, email: user.email },
			token,
		});
	} catch (err) {
		console.error("SIGNUP FULL ERROR:", err);
		console.error("ERROR MESSAGE:", err.message);
		console.error("ERROR STACK:", err.stack);

		res.status(500).json({
			message: "Server error",
			error: err.message
		});
	}
};

// POST /api/auth/login
exports.login = async (req, res) => {
	console.log("LOGIN START");
	console.log("LOGIN BODY:", req.body);
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: 'Email and password are required' });
		}

		const user = await User.findOne({ email });
		console.log("USER FOUND:", user);
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const isMatch = await user.comparePassword(password);
		console.log("PASSWORD MATCH:", isMatch);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const token = generateToken(user._id);

		res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
	} catch (err) {
		console.error('Login error:', err);
		res.status(500).json({
			message: 'Server error',
			error: err.message,
			stack: err.stack,
		});
	}
};
