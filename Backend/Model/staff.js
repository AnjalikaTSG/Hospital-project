const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  username: { type: String, required: true },
  employee_number: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
  password: { type: String, required: true }
});

// Prevent OverwriteModelError
module.exports = mongoose.models.Staff || mongoose.model('Staff', staffSchema, 'staffs');