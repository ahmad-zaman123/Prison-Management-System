const Jailor = require("../models/JailorModels");
const asyncHandler = require('express-async-handler');

const getAllJailors = asyncHandler(async (req, res) => {
    const jailors = await Jailor.find();
    res.status(200).json(jailors);
});

const addJailor = asyncHandler(async (req, res) => {
    const newJailor = new Jailor(req.body);
    await newJailor.save();
    res.status(201).json(newJailor);
});

const getById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const jailor = await Jailor.findById(id);
    if (!jailor) {
        return res.status(404).json({ message: "Jailor not found" });
    }
    res.status(200).json(jailor);
});

const updateJailor = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const updatedJailorData = req.body;
    const updatedJailor = await Jailor.findByIdAndUpdate(id, updatedJailorData, { new: true });
    if (!updatedJailor) {
        return res.status(404).json({ message: "Jailor not found" });
    }
    res.status(200).json(updatedJailor);
});

const deleteJailor = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const jailor = await Jailor.findByIdAndDelete(id);
    if (!jailor) {
        return res.status(404).json({ message: "Jailor not found" });
    }
    res.status(200).json({ message: "Jailor deleted successfully" });
});

module.exports = { getAllJailors, addJailor, getById, updateJailor, deleteJailor };
