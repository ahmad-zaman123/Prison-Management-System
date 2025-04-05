const SecurityStaff = require('../models/SecurityStaff');

const getAllSecurityStaff = async (req, res) => {
  try {
    const securityStaff = await SecurityStaff.find();
    res.json(securityStaff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSecurityStaffById = async (req, res) => {
  try {
    const securityStaff = await SecurityStaff.findById(req.params.id);
    if (!securityStaff) {
      return res.status(404).json({ message: 'Security staff not found' });
    }
    res.json(securityStaff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createSecurityStaff = async (req, res) => {
  try {
    const securityStaff = new SecurityStaff(req.body);
    const newSecurityStaff = await securityStaff.save();
    res.status(201).json({ message: 'Security staff added successfully', newSecurityStaff });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateSecurityStaffById = async (req, res) => {
  try {
    const securityStaff = await SecurityStaff.findById(req.params.id);
    if (!securityStaff) {
      return res.status(404).json({ message: 'Security staff not found' });
    }

    // Update security staff details
    Object.assign(securityStaff, req.body);

    const updatedSecurityStaff = await securityStaff.save();
    res.json({ message: 'Security staff updated', updatedSecurityStaff });
  } catch (err) {
    res.status(400).json({ message: 'Security staff update unsuccessful', error: err.message });
  }
};

const deleteSecurityStaffById = async (req, res) => {
  try {
    const securityStaff = await SecurityStaff.findById(req.params.id);
    if (!securityStaff) {
      return res.status(404).json({ message: 'Security staff not found' });
    }
    await securityStaff.deleteOne();
    res.json({ message: 'Security staff deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllSecurityStaff,
  getSecurityStaffById,
  createSecurityStaff,
  updateSecurityStaffById,
  deleteSecurityStaffById
};
