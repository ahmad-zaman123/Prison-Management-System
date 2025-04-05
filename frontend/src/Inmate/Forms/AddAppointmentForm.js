import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Appointments.css";

const AddAppointmentForm = ({ inmateName, inmateNumber, selectedInmate }) => {
 
    const [formData, setFormData] = useState({
        fullname: inmateName,
        inmatenumber: inmateNumber,
        reason: '',
        appointmentDate: '',
        notes: '',
        action: ''
    });

    useEffect(() => {
        if (selectedInmate) {
            setFormData({
                ...formData,
                fullname: selectedInmate.fullname,
                inmatenumber: selectedInmate.inmatenumber
            });
        }
    }, [selectedInmate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3500/appointment/addappointments', formData);
            alert('New appointment added successfully');
            // Optionally, you can clear the form after successful submission
            window.location.href = './currentAppointments';
            setFormData({
                fullname: '',
                inmatenumber: '',
                reason: '',
                appointmentDate: '',
                notes: ''
            });
        } catch (error) {
            console.error('Error adding appointment:', error);
            alert('Failed to add appointment');
        }
    };

    return (
        <div className="AppointmentContainer">
            <h2 className="appointmentTopic">- ADD NEW APPOINTMENT -</h2>
            <form onSubmit={handleSubmit}>
                <label className="label" htmlFor="fullname">Inmate Name:</label>
                <input type="text" id="fullname" name="fullname" value={formData.fullname} readOnly required /><br /><br />

                <label className="label" htmlFor="inmatenumber">Inmate Number:</label>
                <input type="text" id="inmatenumber" name="inmatenumber" value={formData.inmatenumber} readOnly required /><br /><br />
 
                <label className="label" htmlFor="reason">Reason:</label>
                <input type="text" id="reason" name="reason" value={formData.reason} onChange={handleChange} required /><br /><br />

                <label className="label" htmlFor="appointmentDate">Appointment Date:</label>
                <input type="date" id="appointmentDate" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required /><br /><br />

                <label className="label" htmlFor="notes">Notes:</label><br />
                <textarea id="notes" name="notes" rows="4" cols="50" value={formData.notes} onChange={handleChange}></textarea><br /><br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddAppointmentForm;
