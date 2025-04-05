const Doctor = require("../models/DoctorModel");
const asyncHandler = require('express-async-handler');

const getAllDoctor = asyncHandler(async (req, res) => {
    const Doctors = await Doctor.find();
    res.status(200).json(Doctors);
});

const addDoctor = asyncHandler(async (req, res) => {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).json(newDoctor);
});

const getById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const doctor = await Doctor.findById(id);
    if (!doctor) {
        return res.status(404).json({ message: "Jailor not found" });
    }
    res.status(200).json(Doctor);
});

const updateDoctor = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const updatedDoctorData = req.body;
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updatedDoctorData, { new: true });
    if (!updatedDoctor) {
        return res.status(404).json({ message: "Jailor not found" });
    }
    res.status(200).json(updatedDoctor);
});

const deleteDoctor = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor) {
        return res.status(404).json({ message: "Jailor not found" });
    }
    res.status(200).json({ message: "Jailor deleted successfully" });
});

module.exports = {getAllDoctor,addDoctor, getById,updateDoctor, deleteDoctor};
