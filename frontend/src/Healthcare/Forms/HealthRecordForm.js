import React, { useState } from 'react';
import axios from 'axios';
import './healthRecordForm.css';

const HealthRecordForm = ({ inmateName }) => {
    const [formData, setFormData] = useState({
        InmateName: inmateName,
        dateOfBirth: '',
        diagnosis: '',
        medications: '',
        notes: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false); // Add the submitted state variable

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        switch (name) {
            case 'InmateName':
                validateInmateName(value);
                break;
            case 'dateOfBirth':
                validateDateOfBirth(value);
                break;
            case 'diagnosis':
                validateDiagnosis(value);
                break;
            default:
                break;
        }
    };

    const validateInmateName = (value) => {
        const regex = /^[a-zA-Z. ]+$/;
        if (!value.match(regex)) {
            setErrors({ ...errors, InmateName: 'Inmate Name must include only letters and "." symbol.' });
        } else {
            setErrors({ ...errors, InmateName: '' });
        }
    };

    const validateDateOfBirth = (value) => {
        const dob = new Date(value);
        const today = new Date();
        const hundredYearsAgo = new Date();
        hundredYearsAgo.setFullYear(today.getFullYear() - 100);
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
    
        if (dob > today || dob <= hundredYearsAgo) {
            setErrors({ ...errors, dateOfBirth: 'Date of Birth must be at least 100 years ago and not in the future.' });
        } else if (dob > eighteenYearsAgo) {
            setErrors({ ...errors, dateOfBirth: 'Date of Birth must be at least 18 years ago.' });
        } else {
            setErrors({ ...errors, dateOfBirth: '' });
        }
    };
    
    
const validateDiagnosis = (value) => {
        // Filter out non-letter characters
        const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
        // Update the form data with the filtered value
        setFormData({ ...formData, diagnosis: filteredValue });
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (Object.values(errors).some(error => error !== '')) {
            alert('Please fix the errors before submitting.');
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:3500/healthrecord/addhealthrecords', formData);
            console.log('Success:', response.data);
            window.location.href = '/healthRecords';
            // Reset form data
            setFormData({
                InmateName: '',
                dateOfBirth: '',
                diagnosis: '',
                medications: '',
                notes: ''
            });
            setErrors({});
            // Show success message
            alert('Health record added successfully');
            // Set submitted to true to cancel the form
            setSubmitted(true);
        } catch (error) {
            console.error('Error:', error.response.data);
            // Show error message
            alert('Failed to add health record');
        }
    };



    // Render the form if it's not submitted
    return (
        <div className="healthRecordFormContainer">
             <h2 style={{ color: '#3C78AA', fontWeight: 'bold', textAlign: 'center', marginBottom: '15px' }}>HealthRecord Form</h2>
            <form onSubmit={handleSubmit}>
            
                <div className="formGroup">
                    <label htmlFor="InmateName">Inmate Name</label>
                    <input type="text" id="InmateName" name="InmateName" value={formData.InmateName} onChange={handleChange} required />
                </div>

                <div className="formGroup">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                    {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
                </div>
                <div className="formGroup">
                    <label htmlFor="diagnosis">Diagnosis</label>
                    <input type="text" id="diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleChange} required />
                    {errors.diagnosis && <span className="error">{errors.diagnosis}</span>}
                </div>
                <div className="formGroup">
                    <label htmlFor="medications">Medications</label>
                    <input type="text" id="medications" name="medications" value={formData.medications} onChange={handleChange} required />
                    {errors.medications && <span className="error">{errors.medications}</span>}
                </div>
                <div className="formGroup">
                    <label htmlFor="notes">Notes</label>
                    <textarea className="note" id="notes" name="notes" value={formData.notes} onChange={handleChange} required />
                    {errors.notes && <span className="error">{errors.notes}</span>}
                </div>
                <button style={{backgroundColor:'#3C78AA',marginTop:'10px',marginBottom:'-10px'}} className="addHealthrecordButton" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default HealthRecordForm;
