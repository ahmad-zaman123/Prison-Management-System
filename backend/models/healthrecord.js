const mongoose = require("mongoose");

const healthRecordSchema = new mongoose.Schema({
  InmateName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  diagnosis: {
    type: String,
    required: true,
  },
  medications: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const HealthRecord = mongoose.model("HealthRecord", healthRecordSchema);

module.exports = HealthRecord;
