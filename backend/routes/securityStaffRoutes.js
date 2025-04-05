const express = require('express');
const router = express.Router();
const securityStaffController = require('../controllers/securityStaffController');

// GET all security staff
router.get('/', securityStaffController.getAllSecurityStaff);

// GET a specific security staff by ID
router.get('/:id', securityStaffController.getSecurityStaffById);

// CREATE a new security staff
router.post('/add', securityStaffController.createSecurityStaff);

// UPDATE a security staff by ID
router.put('/update/:id', securityStaffController.updateSecurityStaffById);

// DELETE a security staff by ID
router.delete('/delete/:id', securityStaffController.deleteSecurityStaffById);

module.exports = router;
