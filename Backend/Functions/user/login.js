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

    // Check if staff registration is approved
    if (staff.status !== 'accepted') {
      if (staff.status === 'pending') {
        return res.status(403).json({ message: 'Your registration is pending admin approval. Please wait for approval before logging in.' });
      } else if (staff.status === 'rejected') {
        return res.status(403).json({ message: 'Your registration has been rejected. Please contact the administrator.' });
      } else {
        return res.status(403).json({ message: 'Your account is not active. Please contact the administrator.' });
      }
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