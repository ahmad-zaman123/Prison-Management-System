// routes/healthRecordRoutes.js
const express = require("express");
const router = express.Router();
const healthRecordController = require("../controllers/healthrecordController");

router.post("/addhealthrecords", healthRecordController.createHealthRecord);
router.get("/healthrecords", healthRecordController.getAllHealthRecords);
router.get("/showhealthrecords/:id", healthRecordController.getHealthRecordById);
router.put("/updatehealthrecords/:id", healthRecordController.updateHealthRecord);
router.delete("/deletehealthrecords/:id", healthRecordController.deleteHealthRecord);

module.exports = router;
