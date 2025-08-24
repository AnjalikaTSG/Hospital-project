const Patient = require('../Model/patient');

module.exports = async (req, res) => {
  const { patientId, tabIndex, data } = req.body;
  if (!patientId || !tabIndex || !data) return res.status(400).json({ error: 'Missing fields' });

  try {
    const update = {};
    update[`tab${tabIndex}`] = data;
    const patient = await Patient.findOneAndUpdate(
      { patientId },
      { $set: update },
      { upsert: true, new: true }
    );
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};