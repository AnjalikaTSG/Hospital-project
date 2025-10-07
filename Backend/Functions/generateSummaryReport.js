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
    
    // Get comprehensive data from all sources
    const Patient = require('./Model/patient'); // Use comprehensive patient model
    const patients = await Patient.find(dateFilter);
    const staff = await Staff.find(dateFilter);
    const notifications = await Notification.find({ 
      createdAt: dateFilter.created_at ? { $gte: dateFilter.created_at } : undefined 
    });
    
    // Calculate comprehensive medical statistics
    let totalOPDVisits = 0;
    let totalHospitalizations = 0;
    let activeMedications = 0;
    let completedImmunizations = 0;
    let malePatients = 0;
    let femalePatients = 0;
    let totalAge = 0;
    let patientsWithAge = 0;
    
    patients.forEach(patient => {
      // Extract demographics from tab1
      const demographics = patient.tab1 || {};
      if (demographics.gender === 'male' || demographics.gender === 'Male') malePatients++;
      if (demographics.gender === 'female' || demographics.gender === 'Female') femalePatients++;
      if (demographics.age) {
        totalAge += parseInt(demographics.age);
        patientsWithAge++;
      }
      
      // Extract medical records from tab2
      if (patient.tab2) {
        totalOPDVisits += (patient.tab2.opdRecords || []).length;
        totalHospitalizations += (patient.tab2.hospitalizationRecords || []).length;
      }
      
      // Extract medication and immunization records from tab4
      if (patient.tab4) {
        activeMedications += (patient.tab4.medicationRecords || []).length;
        completedImmunizations += (patient.tab4.immunizationRecords || []).filter(i => i.status === 'Completed').length;
      }
    });
    
    const stats = {
      totalPatients: patients.length,
      totalStaff: staff.length,
      activeStaff: staff.filter(s => s.status === 'accepted').length,
      pendingStaff: staff.filter(s => s.status === 'pending').length,
      adminStaff: staff.filter(s => s.isAdmin).length,
      totalNotifications: notifications.length,
      malePatients,
      femalePatients,
      avgAge: patientsWithAge > 0 ? (totalAge / patientsWithAge).toFixed(1) : 0,
      totalOPDVisits,
      totalHospitalizations,
      activeMedications,
      completedImmunizations,
      systemAlerts: notifications.filter(n => n.type === 'system').length,
      duplicateIssues: notifications.filter(n => n.type === 'duplicate').length,
      lostBookIssues: notifications.filter(n => n.type === 'lost_book').length
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
    doc.fontSize(16).font('Helvetica-Bold').text('Hospital Management Statistics Overview', { align: 'left' });
    doc.moveDown(0.5);
    
    // Patient Demographics & Medical Activity
    doc.fontSize(14).font('Helvetica-Bold').text('Patient Demographics & Medical Activity:', { align: 'left' });
    doc.fontSize(12).font('Helvetica');
    doc.text(`• Total Registered Patients: ${stats.totalPatients}`, { indent: 20 });
    doc.text(`• Male Patients: ${stats.malePatients} (${stats.totalPatients > 0 ? ((stats.malePatients/stats.totalPatients)*100).toFixed(1) : 0}%)`, { indent: 20 });
    doc.text(`• Female Patients: ${stats.femalePatients} (${stats.totalPatients > 0 ? ((stats.femalePatients/stats.totalPatients)*100).toFixed(1) : 0}%)`, { indent: 20 });
    doc.text(`• Average Patient Age: ${stats.avgAge} years`, { indent: 20 });
    doc.text(`• Total OPD Visits: ${stats.totalOPDVisits}`, { indent: 20 });
    doc.text(`• Total Hospitalizations: ${stats.totalHospitalizations}`, { indent: 20 });
    doc.text(`• Active Medication Records: ${stats.activeMedications}`, { indent: 20 });
    doc.text(`• Completed Immunizations: ${stats.completedImmunizations}`, { indent: 20 });
    doc.moveDown(0.5);
    
    // Staff Management
    doc.fontSize(14).font('Helvetica-Bold').text('Staff Management:', { align: 'left' });
    doc.fontSize(12).font('Helvetica');
    doc.text(`• Total Staff Members: ${stats.totalStaff}`, { indent: 20 });
    doc.text(`• Active Staff: ${stats.activeStaff} (${stats.totalStaff > 0 ? ((stats.activeStaff/stats.totalStaff)*100).toFixed(1) : 0}%)`, { indent: 20 });
    doc.text(`• Pending Staff Approvals: ${stats.pendingStaff}`, { indent: 20 });
    doc.text(`• Administrative Staff: ${stats.adminStaff}`, { indent: 20 });
    doc.moveDown(0.5);
    
    // System Health & Issues
    doc.fontSize(14).font('Helvetica-Bold').text('System Health & Issues:', { align: 'left' });
    doc.fontSize(12).font('Helvetica');
    doc.text(`• Total System Notifications: ${stats.totalNotifications}`, { indent: 20 });
    doc.text(`• System Alerts: ${stats.systemAlerts}`, { indent: 20 });
    doc.text(`• Lost Book Issues: ${stats.lostBookIssues}`, { indent: 20 });
    doc.text(`• Duplicate Record Issues: ${stats.duplicateIssues}`, { indent: 20 });
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
    
    // Clinical Insights & Recommendations
    doc.fontSize(14).font('Helvetica-Bold').text('Clinical Insights & Recommendations:', { align: 'left' });
    doc.fontSize(12).font('Helvetica');
    
    // Staff-related recommendations
    if (stats.pendingStaff > 0) {
      doc.text(`• URGENT: Review ${stats.pendingStaff} pending staff applications for hospital operations`, { indent: 20 });
    }
    
    // Patient care recommendations
    if (stats.totalOPDVisits > 0 && stats.totalPatients > 0) {
      const visitsPerPatient = (stats.totalOPDVisits / stats.totalPatients).toFixed(1);
      doc.text(`• Average OPD visits per patient: ${visitsPerPatient} - Monitor high-frequency patients`, { indent: 20 });
    }
    
    if (stats.totalHospitalizations > stats.totalPatients * 0.1) {
      doc.text(`• High hospitalization rate detected - Review patient care protocols`, { indent: 20 });
    }
    
    // System health recommendations
    if (stats.duplicateIssues > 5) {
      doc.text(`• ATTENTION: ${stats.duplicateIssues} duplicate record issues - Data cleanup required`, { indent: 20 });
    }
    
    if (stats.systemAlerts > 10) {
      doc.text(`• High system alert volume (${stats.systemAlerts}) - Technical review recommended`, { indent: 20 });
    }
    
    // Positive indicators
    if (stats.completedImmunizations > 0) {
      doc.text(`• Positive: ${stats.completedImmunizations} immunizations completed - Good preventive care`, { indent: 20 });
    }
    
    if (stats.totalPatients === 0) {
      doc.text(`• No patient data found for this period - Check data collection systems`, { indent: 20 });
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