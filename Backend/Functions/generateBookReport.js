
const PDFDocument = require('pdfkit');
const Notification = require('../Model/notification');

function getSummaryPeriod(query) {
  // Default: all data
  if (query && query.period === 'weekly') {
    // Last 7 days
    const from = new Date();
    from.setDate(from.getDate() - 7);
    return { createdAt: { $gte: from } };
  }
  if (query && query.period === 'monthly') {
    // Last 30 days
    const from = new Date();
    from.setDate(from.getDate() - 30);
    return { createdAt: { $gte: from } };
  }
  return {};
}

async function generateBookReport(res, query = {}) {
  const periodFilter = getSummaryPeriod(query);
  const notifications = await Notification.find({ type: { $in: ['duplicate', 'lost_book'] }, ...periodFilter }, 'message createdAt');
  const doc = new PDFDocument({ margin: 40 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=book_report.pdf');

  doc.fontSize(20).text('Book Issuance & Lost Book Report', { align: 'center' });
  doc.moveDown(1);
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
  doc.end();
  doc.pipe(res);
}

module.exports = generateBookReport;
