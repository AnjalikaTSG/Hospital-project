const bcrypt = require('bcrypt');
const Staff = require('../../Model/staff');

async function loginStaff(req, res) {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Find staff by username
    const staff = await Staff.findOne({ username });
    if (!staff) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Login successful
    res.status(200).json({ message: 'Login successful.', staff: { username: staff.username, position: staff.position, employeeNumber: staff.employeeNumber } });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
}

module.exports = loginStaff;