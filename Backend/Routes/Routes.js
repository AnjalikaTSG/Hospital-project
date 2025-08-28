const express = require('express');
const router = express.Router();

const loginStaff = require('../Functions/user/login');
router.post('/login', loginStaff);

const savePatient = require('../Functions/user/savePatient');
router.post('/patient/save', savePatient);

const getPatient = require('../Functions/user/getPatient');
router.get('/patient/:patientId', getPatient);

const getAllPatients = require('../Functions/user/getAllPatients');
router.get('/patients', getAllPatients);


// Admin staff management routes
const staffManagement = require('../Functions/admin/staffManagement');
router.get('/admin/staff', staffManagement.getAllStaff);
router.get('/admin/staff/pending', staffManagement.getPendingStaff);
router.put('/admin/staff/:id/approve', staffManagement.approveStaff);
router.put('/admin/staff/:id/reject', staffManagement.rejectStaff);

const registerStaff = require('../Functions/user/registerStaff');
router.post('/admin/staff', registerStaff);

module.exports = router;