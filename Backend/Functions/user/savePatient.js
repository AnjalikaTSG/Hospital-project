const Patient = require('../Model/patient');

module.exports = async (req, res) => {
  const { patientId, tabs } = req.body;
  if (!patientId || !tabs) return res.status(400).json({ error: 'Missing fields' });

  try {
    const update = {};
    // tabs is an object: { tab1: {...}, tab2: {...}, ... }
    Object.keys(tabs).forEach(tabKey => {
      update[tabKey] = tabs[tabKey];
    });
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