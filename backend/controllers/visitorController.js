const Visitor = require('../models/Visitor');

const getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();
    res.json(visitors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getVisitorById = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    res.json(visitor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createVisitor = async (req, res) => {
  const { firstName, lastName, dateOfBirth, gender,contactNumber, inmateNo, inmateName, dateOfVisit, timeOfVisit, purposeOfVisit } = req.body;

  try {
    const visitor = new Visitor({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      contactNumber,
      inmateNo,
      inmateName,
      dateOfVisit,
      timeOfVisit,
      purposeOfVisit
    });

    const newVisitor = await visitor.save();
    res.status(201).json({message: 'Visitor Added Success', newVisitor});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateVisitorById = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }

    // Update visitor details
    for (const key in req.body) {
      if (req.body[key] != null) {
        visitor[key] = req.body[key];
      }
    }

    const updatedVisitor = await visitor.save();
    res.json({ message: 'Visitor updated', updatedVisitor });
  } catch (err) {
    res.status(400).json({ message: 'Visitor update unsuccessful', error: err.message });
  }
};

const deleteVisitorById = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }
    await visitor.deleteOne();
    res.json({ message: 'Visitor deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllVisitors,
  getVisitorById,
  createVisitor,
  updateVisitorById,
  deleteVisitorById
};
