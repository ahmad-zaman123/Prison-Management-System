const router = require("express").Router();
const AppointmentController = require("../controllers/appointmentController");

// Route to handle form submission
router.post("/addappointments", AppointmentController.addAppointments);
// Route to retrieve currrent appointments
router.get("/findall", AppointmentController.findAll);
// Route to handle updating appointment details
router.put('/update/:id', AppointmentController.update);
// Route to delete an appointment
router.delete("/delete/:id", AppointmentController.deleteAppointment);
// Route to retrieve approved appointments
router.get("/approved", AppointmentController.findApprovedAppointments);

module.exports = router;
