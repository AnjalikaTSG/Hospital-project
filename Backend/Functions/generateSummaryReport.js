const PDFDocument = require('pdfkit');
const Patient = require('../Model/patient');
const Staff = require('../Model/staff');
const Notification = require('../Model/notification');
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

async function generateSummaryReport(res, query = {}) {
  try {
    const dateFilter = getDateFilter(query);
    const periodName = getPeriodDisplayName(query.period);
    
    // Get data from all sources
    const patients = await Patient.find(dateFilter);
    const staff = await Staff.find(dateFilter);
    const notifications = await Notification.find({ 
      type: { $in: ['duplicate', 'lost_book'] }, 
      createdAt: dateFilter.created_at ? { $gte: dateFilter.created_at } : undefined 
    });
    
    // Calculate statistics
    const stats = {
      totalPatients: patients.length,
      totalStaff: staff.length,
      activeStaff: staff.filter(s => s.status === 'accepted').length,
      pendingStaff: staff.filter(s => s.status === 'pending').length,
      totalNotifications: notifications.length,
      malePatients: patients.filter(p => p.gender === 'Male').length,
      femalePatients: patients.filter(p => p.gender === 'Female').length,
      avgAge: patients.length > 0 ? (patients.reduce((sum, p) => sum + (p.age || 0), 0) / patients.length).toFixed(1) : 0
    };
    
    const doc = new PDFDocument({ margin: 40 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${periodName.toLowerCase()}_summary_report.pdf`);
    
    // Hospital Header
    doc.fontSize(24).font('Helvetica-Bold').text(hospitalConfig.hospital.name, { align: 'center' });
    doc.fontSize(12).font('Helvetica').text(hospitalConfig.hospital.ministry, { align: 'center' });
    doc.text(`${hospitalConfig.hospital.address}`, { align: 'center' });
    doc.text(`Contact: ${hospitalConfig.hospital.phone} | Email: ${hospitalConfig.hospital.email}`, { align: 'center' });
    doc.moveDown(0.5);
    
    // Report Title
    doc.fontSize(20).font('Helvetica-Bold').text(`${periodName} Hospital Summary Report`, { align: 'center' });
    doc.fontSize(12).font('Helvetica').text(`Generated on: ${new Date().toLocaleString('en-US', { timeZone: hospitalConfig.hospital.timezone })}`, { align: 'center' });
    doc.text(`Report Period: ${periodName}`, { align: 'center' });
    doc.moveDown(1);
    
    // Add line separator
    doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();
    doc.moveDown(1);
    
    // Statistics Section
    doc.fontSize(16).font('Helvetica-Bold').text('Hospital Statistics Overview', { align: 'left' });
    doc.moveDown(0.5);
    
    // Patient Statistics
    doc.fontSize(14).font('Helvetica-Bold').text('Patient Statistics:', { align: 'left' });
    doc.fontSize(12).font('Helvetica');
    doc.text(`• Total Patients: ${stats.totalPatients}`, { indent: 20 });
    doc.text(`• Male Patients: ${stats.malePatients} (${stats.totalPatients > 0 ? ((stats.malePatients/stats.totalPatients)*100).toFixed(1) : 0}%)`, { indent: 20 });
    doc.text(`• Female Patients: ${stats.femalePatients} (${stats.totalPatients > 0 ? ((stats.femalePatients/stats.totalPatients)*100).toFixed(1) : 0}%)`, { indent: 20 });
    doc.text(`• Average Age: ${stats.avgAge} years`, { indent: 20 });
    doc.moveDown(0.5);
    
    // Staff Statistics
    doc.fontSize(14).font('Helvetica-Bold').text('Staff Statistics:', { align: 'left' });
    doc.fontSize(12).font('Helvetica');
    doc.text(`• Total Staff: ${stats.totalStaff}`, { indent: 20 });
    doc.text(`• Active Staff: ${stats.activeStaff}`, { indent: 20 });
    doc.text(`• Pending Approvals: ${stats.pendingStaff}`, { indent: 20 });
    doc.moveDown(0.5);
    
    // System Activity
    doc.fontSize(14).font('Helvetica-Bold').text('System Activity:', { align: 'left' });
    doc.fontSize(12).font('Helvetica');
    doc.text(`• Total System Notifications: ${stats.totalNotifications}`, { indent: 20 });
    doc.text(`• Book-related Issues: ${notifications.filter(n => n.type === 'lost_book').length}`, { indent: 20 });
    doc.text(`• Duplicate Records: ${notifications.filter(n => n.type === 'duplicate').length}`, { indent: 20 });
    doc.moveDown(1);
    
    // Department Breakdown (if available)
    const departments = {};
    staff.forEach(s => {
      const dept = s.position || 'Unspecified';
      departments[dept] = (departments[dept] || 0) + 1;
    });
    
    if (Object.keys(departments).length > 0) {
      doc.fontSize(14).font('Helvetica-Bold').text('Staff by Department:', { align: 'left' });
      doc.fontSize(12).font('Helvetica');
      Object.entries(departments).forEach(([dept, count]) => {
        doc.text(`• ${dept}: ${count}`, { indent: 20 });
      });
      doc.moveDown(1);
    }
    
    // Recommendations Section
    doc.fontSize(14).font('Helvetica-Bold').text('System Recommendations:', { align: 'left' });
    doc.fontSize(12).font('Helvetica');
    
    if (stats.pendingStaff > 0) {
      doc.text(`• Review ${stats.pendingStaff} pending staff applications`, { indent: 20 });
    }
    if (notifications.length > 10) {
      doc.text(`• High system activity detected - review ${notifications.length} notifications`, { indent: 20 });
    }
    if (stats.totalPatients === 0) {
      doc.text(`• No patient data found for this period`, { indent: 20 });
    }
    
    doc.moveDown(2);
    
    // Signature Section
    doc.fontSize(12).font('Helvetica');
    doc.text('Report Generated By: Hospital Management System', { align: 'left' });
    doc.text(`Authorized By: ${hospitalConfig.hospital.director}`, { align: 'left' });
    doc.text(`${hospitalConfig.hospital.directorTitle}`, { align: 'left' });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: 'left' });
    
    // Footer
    doc.fontSize(8).font('Helvetica').text(hospitalConfig.reportSettings.footerText, 40, 750, { align: 'center', width: 515 });
    doc.text(hospitalConfig.reportSettings.confidentialityNotice, 40, 765, { align: 'center', width: 515 });
    
    doc.end();
    doc.pipe(res);
    
  } catch (error) {
    console.error('Error generating summary report:', error);
    res.status(500).json({ error: 'Failed to generate summary report' });
  }
}

module.exports = generateSummaryReport;