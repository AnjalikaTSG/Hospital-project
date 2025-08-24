const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define staff schema
const staffSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  employeeNumber: { type: String, required: true, unique: true },
  position: { type: String, enum: ['Doctor', 'Nurse', 'Pharmacist', 'Laboratorist'], required: true }
});

const Staff = mongoose.model('Staff', staffSchema);

async function registerStaff(req, res) {
  try {
    const { username, password, employeeNumber, position } = req.body;

    // Basic validation
    if (!username || !password || !employeeNumber || !position) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check for duplicate username or employee number
    const existingUser = await Staff.findOne({ $or: [{ username }, { employeeNumber }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or Employee Number already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new staff
    const newStaff = new Staff({
      username,
      password: hashedPassword,
      employeeNumber,
      position
    });

    await newStaff.save();

    res.status(201).json({ message: 'Registration successful.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
}

module.exports = registerStaff;