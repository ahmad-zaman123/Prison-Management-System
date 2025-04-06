const Doctor = require("../models/DoctorModel");
const asyncHandler = require('express-async-handler');

const getAllDoctor = asyncHandler(async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});

const addDoctor = asyncHandler(async (req, res) => {
    const doctor = new Doctor(req.body);
    try {
        const newDoctor = await doctor.save();
        res.status(201).json(newDoctor);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
});

const getById = asyncHandler(async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
          return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});

const updateDoctor = asyncHandler(async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!doctor) {
          return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
});

const deleteDoctor = asyncHandler(async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) {
          return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});

module.exports = {getAllDoctor,addDoctor, getById,updateDoctor, deleteDoctor};
