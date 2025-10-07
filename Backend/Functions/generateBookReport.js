
const PDFDocument = require('pdfkit');
const Notification = require('../Model/notification');
const hospitalConfig = require('../Config/hospitalConfig');

function getSummaryPeriod(query) {
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
  
  return { createdAt: { $gte: fromDate } };
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

async function generateBookReport(res, query = {}) {
  const periodFilter = getSummaryPeriod(query);
  const notifications = await Notification.find({ type: { $in: ['duplicate', 'lost_book'] }, ...periodFilter }, 'message createdAt');
  const periodName = getPeriodDisplayName(query.period);
  
  const doc = new PDFDocument({ margin: 40 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${periodName.toLowerCase()}_book_report.pdf`);

  // Hospital Header
  doc.fontSize(24).font('Helvetica-Bold').text(hospitalConfig.hospital.name, { align: 'center' });
  doc.fontSize(12).font('Helvetica').text(hospitalConfig.hospital.ministry, { align: 'center' });
  doc.text(`${hospitalConfig.hospital.address}`, { align: 'center' });
  doc.text(`Contact: ${hospitalConfig.hospital.phone} | Email: ${hospitalConfig.hospital.email}`, { align: 'center' });
  doc.moveDown(0.5);
  
  // Report Title
  doc.fontSize(18).font('Helvetica-Bold').text(`${periodName} Book Issuance & Lost Book Report`, { align: 'center' });
  doc.fontSize(12).font('Helvetica').text(`Generated on: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}`, { align: 'center' });
  doc.text(`Total Records: ${notifications.length}`, { align: 'center' });
  doc.moveDown(1);
  
  // Add line separator
  doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();
  doc.moveDown(0.5);
  // Table header
  doc.fontSize(12).font('Helvetica-Bold');
  doc.text('No', 50, doc.y, { width: 30, continued: true });
  doc.text('Message', 90, doc.y, { width: 300, continued: true });
  doc.text('Date', 400, doc.y, { width: 120 });
  doc.font('Helvetica');
  notifications.forEach((n, idx) => {
    doc.text(String(idx + 1), 50, doc.y, { width: 30, continued: true });
    doc.text(n.message || '', 90, doc.y, { width: 300, continued: true, lineGap: 2 });
    doc.text(n.createdAt ? new Date(n.createdAt).toLocaleString() : '', 400, doc.y, { width: 120 });
  });
  
  // Footer
  doc.fontSize(8).font('Helvetica').text(hospitalConfig.reportSettings.footerText, 40, 750, { align: 'center', width: 515 });
  doc.text(hospitalConfig.reportSettings.confidentialityNotice, 40, 765, { align: 'center', width: 515 });
  
  doc.end();
  doc.pipe(res);
}

module.exports = generateBookReport;
