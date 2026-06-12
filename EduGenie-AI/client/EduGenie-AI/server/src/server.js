// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");


const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const aiRoutes = require("./routes/aiRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.originalUrl);
  next();
});

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api", protectedRoutes);

// Test routes
app.get("/", (req, res) => {
  res.send("EduGenie AI Backend Running");
});

app.get("/api/message", (req, res) => {
  res.json({
    message: "Hello from EduGenie AI Backend 🚀",
  });
});

// Start server
const start = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {

    console.error("Failed to start server:", err.message || err);

    process.exit(1);
  }
};

start();