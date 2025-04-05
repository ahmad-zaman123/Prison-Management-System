const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    inmatenumber: {
        type: Number,
    },
    reason: {
        type: String,
    },
    appointmentDate: {
        type: Date,
    },
    notes: {
        type: String,
    },
    action: {
        type: String,
    }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
