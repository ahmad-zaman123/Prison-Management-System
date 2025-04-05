const appointment = require('../models/appointment');


const addAppointments = async (req, res, next) => {
    const { 
        fullname,
        inmatenumber,
        reason,
        appointmentDate,
        notes,
        action

 } = req.body;


    try{
        const appointments = new appointment({ 
            fullname,
            inmatenumber,
            reason,
            appointmentDate,
            notes,
            action
        });
        await appointments.save();

        res.status(201).send('New appointment added successfully');
    } catch(error){
        console.error('Error:', error);
        res.status(500).send('Failed to add appointment');
    }
};


// Retrieve all appointments(Current Appointments)
const findAll = async (req, res) => {
    try {
        const notApprovedAppointments = await appointment.find({ action: { $ne: 'Approved' } });
        res.status(200).json(notApprovedAppointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
  

  // Find approved appointments
    exports.findApprovedAppointments = async (req, res) => {
        try {
            const approvedAppointments = await appointment.find({ action: 'Approved' });
            res.status(200).json(approvedAppointments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

  
  // Retrieve a single appointment by id
  exports.findOne = async (req, res) => {
    try {
      const appointment = await appointment.findById(req.params.id);
      if (!appointment)
        return res.status(404).json({ message: "Appointment not found" });
      res.status(200).json(appointment);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


// Update appointment details
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAppointment = await appointment.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAppointment)
            return res.status(404).json({ message: "Appointment not found" });
        res.status(200).json(updatedAppointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

  
    // Delete an appointment by id
    exports.deleteAppointment = async (req, res) => {
        try {
            const deletedAppointment = await appointment.findByIdAndDelete(req.params.id);
            if (!deletedAppointment)
                return res.status(404).json({ message: "Appointment not found" });
            res.status(200).json({ message: "Appointment deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

  







exports.addAppointments = addAppointments;
exports.findAll = findAll;
exports.update = update;



