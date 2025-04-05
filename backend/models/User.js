const mongoose = require('mongoose');

// Define user schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Plain text password
});

// No need to hash password before saving to DB, remove the pre-save hook

module.exports = mongoose.model('User', UserSchema);
