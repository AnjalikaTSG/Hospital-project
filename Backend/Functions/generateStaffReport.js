const PDFDocument = require('pdfkit');
const Staff = require('../Model/staff');
const hospitalConfig = require('../Config/hospitalConfig');

// Helper function to get date filter based on period
function getDateFilter(query) {
  const now = new Date();
  let fromDate;
  
  switch (query.period) {
    case 'daily':
      fromDate = new Date();
      fromDate.setHours(0, 0, 0, 0);
      break;
    case 'weekly':
      fromDate = new Date();
      fromDate.setDate(now.getDate() - 7);
      break;
    case 'monthly':
      fromDate = new Date();
      fromDate.setMonth(now.getMonth() - 1);
      break;
    case 'annually':
      fromDate = new Date();
      fromDate.setFullYear(now.getFullYear() - 1);
      break;
    default:
      return {}; // No filter for all data
  }
  
  return { created_at: { $gte: fromDate } };
}

// Helper function to get period display name
function getPeriodDisplayName(period) {
  const periodMap = {
    daily: 'Daily',
    weekly: 'Weekly', 
    monthly: 'Monthly',
    annually: 'Annual'
  };
  return periodMap[period] || 'Complete';
}

async function generateStaffReport(res, query = {}) {
  const dateFilter = getDateFilter(query);
  const staffList = await Staff.find(dateFilter, 'employee_number name position status created_at lastLoginAt');
  const periodName = getPeriodDisplayName(query.period);
  
  const doc = new PDFDocument({ margin: 40 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${periodName.toLowerCase()}_staff_report.pdf`);
  
  // Hospital Header
  doc.fontSize(24).font('Helvetica-Bold').text(hospitalConfig.hospital.name, { align: 'center' });
  doc.fontSize(12).font('Helvetica').text(hospitalConfig.hospital.ministry, { align: 'center' });
  doc.text(`${hospitalConfig.hospital.address}`, { align: 'center' });
  doc.text(`Contact: ${hospitalConfig.hospital.phone} | Email: ${hospitalConfig.hospital.email}`, { align: 'center' });
  doc.moveDown(0.5);
  
  // Report Title
  doc.fontSize(18).font('Helvetica-Bold').text(`${periodName} Staff Activity Report`, { align: 'center' });
  doc.fontSize(12).font('Helvetica').text(`Generated on: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}`, { align: 'center' });
  doc.text(`Total Staff: ${staffList.length}`, { align: 'center' });
  doc.moveDown(1);
  
  // Add line separator
  doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();
  doc.moveDown(0.5);
  // Table header
  doc.fontSize(12).font('Helvetica-Bold');
  doc.text('No', 50, doc.y, { width: 30, continued: true });
  doc.text('Employee No', 90, doc.y, { width: 70, continued: true });
  doc.text('Name', 170, doc.y, { width: 90, continued: true });
  doc.text('Position', 270, doc.y, { width: 100, continued: true });
  doc.text('Status', 380, doc.y, { width: 60, continued: true });
  doc.text('Join Date', 450, doc.y, { width: 80 });
  doc.font('Helvetica');
  staffList.forEach((s, idx) => {
    doc.text(String(idx + 1), 50, doc.y, { width: 30, continued: true });
    doc.text(s.employee_number || '', 90, doc.y, { width: 70, continued: true });
    doc.text(s.name || '', 170, doc.y, { width: 90, continued: true });
    doc.text(s.position || '', 270, doc.y, { width: 100, continued: true, lineGap: 2 });
    doc.text(s.status || '', 380, doc.y, { width: 60, continued: true });
    doc.text(s.created_at ? new Date(s.created_at).toLocaleDateString() : '', 450, doc.y, { width: 80 });
  });
  
  // Footer
  doc.fontSize(8).font('Helvetica').text(hospitalConfig.reportSettings.footerText, 40, 750, { align: 'center', width: 515 });
  doc.text(hospitalConfig.reportSettings.confidentialityNotice, 40, 765, { align: 'center', width: 515 });
  
  doc.end();
  doc.pipe(res);
}

module.exports = generateStaffReport;
