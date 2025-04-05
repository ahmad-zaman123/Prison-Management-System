const Visit = require('../models/Visit');

const getAllVisits = async (req, res) => {
  try {
    const visits = await Visit.find();
    res.json(visits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getVisitById = async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id);
    if (!visit) {
      return res.status(404).json({ message: 'Visit not found' });
    }
    res.json(visit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createVisit = async (req, res) => {
  const {
    visitorName,
    nic,
    inmateNo,
    dateOfVisit,
    checkInTime,
    checkOutTime,
    duration
  } = req.body;

  try {
    const visit = new Visit({
      visitorName,
      nic,
      inmateNo,
      dateOfVisit,
      checkInTime,
      checkOutTime,
      duration
    });

    const newVisit = await visit.save();
    res.status(201).json({ message: 'Visit added successfully', newVisit });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateVisitById = async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id);
    if (!visit) {
      return res.status(404).json({ message: 'Visit not found' });
    }

    // Update visit details
    for (const key in req.body) {
      if (req.body[key] != null) {
        visit[key] = req.body[key];
      }
    }

    const updatedVisit = await visit.save();
    res.json({ message: 'Visit updated', updatedVisit });
  } catch (err) {
    res.status(400).json({ message: 'Visit update unsuccessful', error: err.message });
  }
};

const deleteVisitById = async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id);
    if (!visit) {
      return res.status(404).json({ message: 'Visit not found' });
    }
    await visit.deleteOne();
    res.json({ message: 'Visit deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllVisits,
  getVisitById,
  createVisit,
  updateVisitById,
  deleteVisitById
};
