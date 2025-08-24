const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patientId: { type: String, required: true, unique: true },
  tab1: Object,
  tab2: Object,
  tab3: Object,
  tab4: Object,
  tab5: Object,
  tab6: Object,
});

module.exports = mongoose.model('Patient', patientSchema);