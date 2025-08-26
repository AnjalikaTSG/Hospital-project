const express = require('express');
const router = express.Router();

const registerStaff = require('../Functions/user/registerStaff');
router.post('/register', registerStaff);

const loginStaff = require('../Functions/user/login');
router.post('/login', loginStaff);

const savePatient = require('../Functions/user/savePatient');
router.post('/patient/save', savePatient);

const getPatient = require('../Functions/user/getPatient');
router.get('/patient/:patientId', getPatient);

const getAllPatients = require('../Functions/user/getAllPatients');
router.get('/patients', getAllPatients);

module.exports = router;