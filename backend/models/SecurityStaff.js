const mongoose = require('mongoose');

const securityStaffSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other'],
  },
  nic: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  maritalStatus: {
    type: String,
    required: true,
    enum: ['single', 'married', 'divorced'], 
  },
  religion: {
    type: String,
    required: true,
  },
  educationalBackground: {
    type: String,
    required: true,
  },
  certification: {
    type: String,
    required: true,
  },
  completedCourses: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SecurityStaff', securityStaffSchema);
