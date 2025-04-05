// DoctorForm.js
import React, { useState } from 'react';
import "./DoctorForm.css"
import axios from 'axios';
function DoctorForm() {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        DateofBirth: '',
        ContactNumber: '',
        Gender: '',
        Specialty: '',
        MedicalLicenseNumber: '',
        StartDate: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3500/Doctros", formData);
            console.log("Form submitted successfully!");
            
        } catch (error) {
            console.error("Error:", error);}
            
    };



    return (
        <>
            <h2 style={{ color: '#3C78AA', fontWeight: 'bold', textAlign: 'center', marginBottom: '15px' }}>Doctor Form</h2>
            

<div className='form1'>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} >
        <div>
          <label className='Addjailor-lable'>First Name: </label> <br />
          <input type="text" className='addjailorinputs' name="FirstName" value={formData.FirstName} onChange={handleChange} required />
        </div>
        <div>
          {/* {errors.FirstNameError && <span className="error">{errors.FirstNameError}</span>} */}
          <label className='Addjailor-lable'>Last Name: </label> <br />
          <input type="text" className='addjailorinputs' name="LastName" value={formData.LastName} onChange={handleChange} required /><br />
          {/* {errors.LastNameError && <span className="error">{errors.LastNameError}</span>} */}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} >
        <div>
          <label className='Addjailor-lable'>Date of Birth: </label> <br />
          <input type="date" className='addjailorinputs' name="DateofBirth" value={formData.DateofBirth} onChange={handleChange} required /><br />
          {/* {errors.DateOfBirthError && <span className="error">{errors.DateOfBirthError}</span>} */}
        </div>
        <div>
          {/* <label className='Addjailor-lable'>Contact Number: </label> <br />
          <input type="text" className='addjailorinputs' name="ContactNumber" value={formData.ContactNumber} onChange={handleChange} required /><br /> */}
          <label  className='Doctor-form-label'>Contact Number:</label>
                        <input
                            type="tel"
                            id="contactNumber"
                            name="ContactNumber"
                            value={formData.ContactNumber}
                            onChange={handleChange}
                            className="addjailorinputs"
                            required
                        />
          {/* {errors.ContactNumberError && <span className="error">{errors.ContactNumberError}</span>} */}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} >
        <div>

        <label className='Addjailor-lable' style={{ marginBottom: '15px' }}>Gender: </label> <br />
          <input type="radio" id="male" name="Gender" value="male" onChange={handleChange} checked={formData.Gender === "male"} required />
          <label htmlFor="male" className='radio-lable'>Male</label>
          <input type="radio" id="female" name="Gender" value="female" onChange={handleChange} checked={formData.Gender === "female"} required />
          <label htmlFor="female" className='radio-lable'>Female</label>

          {/* <label className='Addjailor-lable'>Emergency Contact Number: </label> <br /> */}
          {/* <input type="text" className='addjailorinputs' name="EmergencyContactNumber" value={formData.EmergencyContactNumber} onChange={handleChange} required /><br /> */}
          {/* {errors.EmergencyContactNumberError && <span className="error">{errors.EmergencyContactNumberError}</span>} */}
        </div>
        <div>
          <label className='Addjailor-lable'>Specialty:</label> <br />
          <input
                            type="text"
                            id="specialty"
                            name="Specialty"
                            value={formData.Specialty}
                            onChange={handleChange}
                            className='addjailorinputs'
                            required
                        />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }} >
        <div>
        <label htmlFor="medicalLicenseNumber" className='Addjailor-lable'>Medical License Number:</label>
                        <input
                            type="text"
                            id="medicalLicenseNumber"
                            name="MedicalLicenseNumber"
                            value={formData.MedicalLicenseNumber}
                            onChange={handleChange}
                            className="addjailorinputs"
                            required
                        />
          
        </div>
        <div>
        <label htmlFor="startDate" className='Addjailor-lable'>Start Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            name="StartDate"
                            value={formData.StartDate}
                            onChange={handleChange}
                            className="addjailorinputs"
                            required
                        />
        </div>
      </div>
      <button  onClick={handleSubmit} className="Doctor-submit-button" >Submit</button>
    </div>
            
        </>
    );
}

export default DoctorForm;
