const connection = require('../../Services/Connection');

// Get all staff with their status
module.exports.getAllStaff = async function (req, res) {
  try {
    const [rows] = await connection.query(
      'SELECT id, username, employee_number, position, status, created_at FROM hospital_project.hospitalstaff ORDER BY created_at DESC'
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get only pending staff
module.exports.getPendingStaff = async function (req, res) {
  try {
    const [rows] = await connection.query(
      'SELECT id, username, employee_number, position, created_at FROM hospital_project.hospitalstaff WHERE status = "pending" ORDER BY created_at DESC'
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve staff member
module.exports.approveStaff = async function (req, res) {
  const { id } = req.params;
  try {
    await connection.query(
      'UPDATE hospital_project.hospitalstaff SET status = "accepted" WHERE id = ?',
      [id]
    );
    res.status(200).json({ message: 'Staff member accepted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reject staff member
module.exports.rejectStaff = async function (req, res) {
  const { id } = req.params;
  try {
    await connection.query(
      'UPDATE hospital_project.hospitalstaff SET status = "rejected" WHERE id = ?',
      [id]
    );
    res.status(200).json({ message: 'Staff member rejected successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 