const HealthRecord = require("../models/healthrecord");

exports.createHealthRecord = async (req, res) => {
  try {
    const healthRecord = new HealthRecord(req.body);
    await healthRecord.save();
    res.status(201).send(healthRecord);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllHealthRecords = async (req, res) => {
  try {
    const healthRecords = await HealthRecord.find({});
    res.send(healthRecords);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getHealthRecordById = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id);
    if (!healthRecord) {
      return res.status(404).send();
    }
    res.send(healthRecord);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!healthRecord) {
      return res.status(404).send();
    }
    res.send(healthRecord);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findByIdAndDelete(req.params.id);
    if (!healthRecord) {
      return res.status(404).send();
    }
    res.send(healthRecord);
  } catch (error) {
    res.status(500).send(error);
  }
};
