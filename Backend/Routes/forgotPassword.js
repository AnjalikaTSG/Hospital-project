const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Simulate DB with a JSON file for demo
const REQUESTS_FILE = path.join(__dirname, '../Model/forgotPasswordRequests.json');

function readRequests() {
	if (!fs.existsSync(REQUESTS_FILE)) return [];
	return JSON.parse(fs.readFileSync(REQUESTS_FILE));
}
function writeRequests(requests) {
	fs.writeFileSync(REQUESTS_FILE, JSON.stringify(requests, null, 2));
}

// POST /forgot-password
router.post('/', (req, res) => {
	const { username, employeeNumber } = req.body;
	if (!username || !employeeNumber) {
		return res.status(400).json({ message: 'Username and employee number required.' });
	}
	const requests = readRequests();
	requests.push({ username, employeeNumber, status: 'pending', requestedAt: new Date() });
	writeRequests(requests);
	res.json({ message: 'Request submitted. Await admin approval.' });
});

// GET /forgot-password (admin view)
router.get('/', (req, res) => {
	const requests = readRequests();
	res.json(requests);
});

// PATCH /forgot-password/accept (admin accepts)
router.patch('/accept', (req, res) => {
	const { username } = req.body;
	let requests = readRequests();
	requests = requests.map(r => r.username === username ? { ...r, status: 'accepted' } : r);
	writeRequests(requests);
	res.json({ message: 'Request accepted.' });
});

module.exports = router;
