const PDFDocument = require('pdfkit');
const Patient = require('../Model/patient');

async function generatePatientReport(res) {
  const patients = await Patient.find({}, 'patientId name age gender address contact');
  const doc = new PDFDocument({ margin: 40 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=patient_report.pdf');
  doc.fontSize(20).text('Base Hospital - Avissawella', { align: 'center' });
  doc.moveDown(1);
  doc.fontSize(16).text('Patient Report', { align: 'center' });
  doc.moveDown(1);
  // Table header
  doc.fontSize(12).font('Helvetica-Bold');
  doc.text('No', 50, doc.y, { width: 30, continued: true });
  doc.text('Patient ID', 90, doc.y, { width: 70, continued: true });
  doc.text('Name', 170, doc.y, { width: 90, continued: true });
  doc.text('Age', 270, doc.y, { width: 30, continued: true });
  doc.text('Gender', 310, doc.y, { width: 50, continued: true });
  doc.text('Address', 370, doc.y, { width: 120, continued: true });
  doc.text('Contact', 500, doc.y, { width: 80 });
  doc.font('Helvetica');
  patients.forEach((p, idx) => {
    doc.text(String(idx + 1), 50, doc.y, { width: 30, continued: true });
    doc.text(p.patientId || '', 90, doc.y, { width: 70, continued: true });
    doc.text(p.name || '', 170, doc.y, { width: 90, continued: true });
    doc.text(p.age !== undefined ? String(p.age) : '', 270, doc.y, { width: 30, continued: true });
    doc.text(p.gender || '', 310, doc.y, { width: 50, continued: true });
    doc.text(p.address || '', 370, doc.y, { width: 120, continued: true, lineGap: 2 });
    doc.text(p.contact || '', 500, doc.y, { width: 80 });
  });
  doc.end();
  doc.pipe(res);
}

module.exports = generatePatientReport;
