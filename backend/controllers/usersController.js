const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken'); // Import JWT for token generation

const register = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    // Directly store the plain password (no hashing)
    const newUser = new User({ username, password });

    await newUser.save();

    res.json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error registering user" });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    console.log("Request body received:", req.body); // Log incoming request data

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Please provide both username and password." });
    }

    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid username or password" });
    }

    // Directly compare the provided password with the stored password
    if (user.password !== password) {
      return res.status(400).json({ success: false, message: "Invalid username or password" });
    }

    // Generate JWT token if passwords match
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ success: true, token });
  } catch (error) {
    console.error("Error during login:", error); // Log any error that occurs
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    res.json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting user." });
  }
});


module.exports = {
  register,
  login,
  deleteUser
};
