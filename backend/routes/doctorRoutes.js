const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/DoctorStaffController');

router.route('/')
    .get(DoctorController.getAllDoctor)
    .post(DoctorController.addDoctor);

router.route('/:id')
    .get(DoctorController.getById)
    .put(DoctorController.updateDoctor)
    .delete(DoctorController.deleteDoctor);

module.exports = router;
