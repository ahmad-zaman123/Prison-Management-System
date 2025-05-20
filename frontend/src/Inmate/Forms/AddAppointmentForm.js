import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Appointments.css";

const AddAppointmentForm = ({ inmateName, inmateNumber, selectedInmate }) => {

    const navigate = useNavigate();
 
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
            
            // window.location.href = './currentAppointments';
            navigate("/currentAppointments");
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
        <div className="FormContainer">
            <h2 style={{ color: '#3C78AA', fontWeight: 'bold', textAlign: 'center', marginBottom: '25px' }}>Appointment Form</h2>
            <form onSubmit={handleSubmit}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                <div className="formsGroup">
                <label  htmlFor="inmatenumber">Inmate Number:</label>
                <input type="text" id="inmatenumber" name="inmatenumber" value={formData.inmatenumber} readOnly required /><br /><br />
                </div>

                <div className="formsGroup">
            <label htmlFor="fullname">Inmate Name:</label>
            <input type="text" id="fullname" name="fullname" value={formData.fullname} readOnly required /><br /><br />
                </div>
                </div>

                <div className="formsGroup">
                <label  htmlFor="reason">Reason:</label>
                <input type="text" id="reason" name="reason" value={formData.reason} onChange={handleChange} required /><br /><br />
                </div>

                <div className="formsGroup">
                <label  htmlFor="appointmentDate">Appointment Date:</label>
                <input type="date" id="appointmentDate" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required /><br /><br />
                </div>

                <div className="formsGroup">
                <label htmlFor="notes">Notes:</label><br />
                <textarea id="notes" name="notes" rows="4" cols="50" value={formData.notes} onChange={handleChange}></textarea><br /><br />
                </div>

                <button style={{backgroundColor:'#3C78AA',marginTop:'10px',marginBottom:'-40px'}} className="recordButton" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddAppointmentForm;
