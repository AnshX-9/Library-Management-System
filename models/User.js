const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now, },
})

const User = mongoose.model('User', UserModel);

module.exports = User;