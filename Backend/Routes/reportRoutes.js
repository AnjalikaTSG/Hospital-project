const express = require('express');
const router = express.Router();
const generateStaffReport = require('../Functions/generateStaffReport');
const generateBookReport = require('../Functions/generateBookReport');
const generatePatientReport = require('../Functions/generatePatientReport');

// PDF download endpoint for staff report
router.get('/staff/download', async (req, res) => {
	try {
		await generateStaffReport(res);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// PDF download endpoint for book report
router.get('/book/download', async (req, res) => {
	try {
		await generateBookReport(res);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// PDF download endpoint for patient report
router.get('/patient/download', async (req, res) => {
	try {
		await generatePatientReport(res);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
