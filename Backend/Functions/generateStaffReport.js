const PDFDocument = require('pdfkit');
const Staff = require('../Model/staff');

async function generateStaffReport(res) {
  const staffList = await Staff.find({}, 'employee_number name role status');
  const doc = new PDFDocument({ margin: 40 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=staff_report.pdf');
  doc.fontSize(20).text('Base Hospital - Avissawella', { align: 'center' });
  doc.moveDown(1);
  doc.fontSize(16).text('Staff Activity Report', { align: 'center' });
  doc.moveDown(1);
  // Table header
  doc.fontSize(12).font('Helvetica-Bold');
  doc.text('No', 50, doc.y, { width: 30, continued: true });
  doc.text('Employee No', 90, doc.y, { width: 70, continued: true });
  doc.text('Name', 170, doc.y, { width: 90, continued: true });
  doc.text('Role', 270, doc.y, { width: 120, continued: true });
  doc.text('Status', 400, doc.y, { width: 80 });
  doc.font('Helvetica');
  staffList.forEach((s, idx) => {
    doc.text(String(idx + 1), 50, doc.y, { width: 30, continued: true });
    doc.text(s.employee_number || '', 90, doc.y, { width: 70, continued: true });
    doc.text(s.name || '', 170, doc.y, { width: 90, continued: true });
    doc.text(s.role || '', 270, doc.y, { width: 120, continued: true, lineGap: 2 });
    doc.text(s.status || '', 400, doc.y, { width: 80 });
  });
  doc.end();
  doc.pipe(res);
}

module.exports = generateStaffReport;
