const connection = require('../../Services/Connection');

module.exports.registerStaff = async function (req, res) {
  const { username, password, employee_number, position } = req.body;
  try {
    await connection.query(
      'INSERT INTO hospital_project.hospitalstaff (username, password, employee_number, position, status) VALUES (?, ?, ?, ?, ?)',
      [username, password, employee_number, position, 'pending']
    );
    res.status(201).json({ message: 'Registration submitted for admin approval' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};