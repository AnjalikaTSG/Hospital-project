const express=require('express');
const router=express.Router();

// should import function paths
const getData=require('../Functions/postData');
const { registerStaff }=require('../Functions/user/register');
const { getAllStaff, getPendingStaff, approveStaff, rejectStaff }=require('../Functions/admin/staffManagement');

router.get('postData', (req, res) => {
    getData(req, res)
});

router.post('/register', (req, res) => {
    registerStaff(req, res)
});

// Admin routes for staff management
router.get('/admin/staff', (req, res) => {
    getAllStaff(req, res)
});

router.get('/admin/staff/pending', (req, res) => {
    getPendingStaff(req, res)
});

router.put('/admin/staff/:id/approve', (req, res) => {
    approveStaff(req, res)
});

router.put('/admin/staff/:id/reject', (req, res) => {
    rejectStaff(req, res)
});

module.exports=router;