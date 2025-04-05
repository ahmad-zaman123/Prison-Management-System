const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  visitorName: {
    type: String,
    required: true,
  },
  inmateNo: {
    type: String,
    required: true,
  },
  dateOfVisit: {
    type: Date,
    required: true,
  },
  checkInTime: {
    type: String,
    required: true,
  },
  checkOutTime: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Visit', visitSchema);
