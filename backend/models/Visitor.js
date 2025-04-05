const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
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
    enum: ['Male', 'Female', 'Other'],
  },
  contactNumber: {
    type: String,
    required: true,
  },
  inmateNo: {
    type: String,
    required: true,
  },
  inmateName: {
    type: String,
    required: true,
  },
  dateOfVisit: {
    type: Date,
    required: true,
  },
  timeOfVisit: {
    type: String,
    required: true,
  },
  purposeOfVisit: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Visitor', visitorSchema);
