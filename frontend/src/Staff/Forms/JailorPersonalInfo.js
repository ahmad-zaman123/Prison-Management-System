import React, { useState } from 'react';
import "./JailorPersonalInfo.css";

function JailorPersonalInfo({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value // Ensure value is lowercase
    }));
    validateInput(name, value); // Validate input on change
  };

  const validateInput = (name, value) => {
    const nameRegex = /^[a-zA-Z\s]+$/; // Allow alphabetic characters and spaces for name
    const contactNumberRegex = /^\d+$/; // Allow any digits for contact number
    const EmergencyContactNumberRegex = /^\d+$/; // Allow any digits for emergency contact number
    const currentDate = new Date(); // Get current date

    switch (name) {
      case 'FirstName':
        if (!nameRegex.test(value)) {
          setFormData(prevData => ({
            ...prevData,
            FirstName: value.replace(/[^a-zA-Z\s]/g, '') // Remove non-alphabetic characters
          }));
        }
        break;
      case 'LastName':
        if (!nameRegex.test(value)) {
          setFormData(prevData => ({
            ...prevData,
            LastName: value.replace(/[^a-zA-Z\s]/g, '') // Remove non-alphabetic characters
          }));
        }
        break;
      case 'ContactNumber':
        if (!contactNumberRegex.test(value)) {
          setFormData(prevData => ({
            ...prevData,
            ContactNumber: value.replace(/[^\d+\s]/g, '')
          }));
        }
        break;
      case 'EmergencyContactNumber':
        if (!EmergencyContactNumberRegex.test(value)) {
          setFormData(prevData => ({
            ...prevData,
            EmergencyContactNumber: value.replace(/[^\d+\s]/g, '')
          }));
        }
        break;
      case 'DateofBirth':
        const dateOfBirth = new Date(value); // Convert input value to a Date object
        if (isNaN(dateOfBirth.getTime())) { // Check if input value is a valid date
          setErrors(prevErrors => ({
            ...prevErrors,
            DateOfBirthError: 'Invalid date of birth'
          }));
        } else {
          const age = currentDate.getFullYear() - dateOfBirth.getFullYear(); // Calculate age
          if (age < 18 || age > 30) { // Validate age
            setErrors(prevErrors => ({
              ...prevErrors,
              DateOfBirthError: 'Age must be between 18 and 30 years'
            }));
          } else {
            setErrors(prevErrors => ({
              ...prevErrors,
              DateOfBirthError: '' // Clear error if age is valid
            }));
          }
        }
        break;
      default:
        break;
    }
  };

  const [errors, setErrors] = useState({
    FirstNameError: '',
    LastNameError: '',
    ContactNumberError: '',
    EmergencyContactNumberError: '',
    DateOfBirthError: '' // Error state for date of birth validation
  });

  return (
    <div className='form1'>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} >
        <div>
          <label className='Addjailor-lable'>First Name: </label>
          <input type="text" className='addjailorinputs' name="FirstName" value={formData.FirstName} onChange={handleChange} required />
        </div>
        <div>
          {errors.FirstNameError && <span className="error">{errors.FirstNameError}</span>}
          <label className='Addjailor-lable'>Last Name: </label>
          <input type="text" className='addjailorinputs' name="LastName" value={formData.LastName} onChange={handleChange} required /><br />
          {errors.LastNameError && <span className="error">{errors.LastNameError}</span>}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} >
        <div>
          <label className='Addjailor-lable'>Date of Birth: </label> <br />
          <input type="date" className='addjailorinputs' name="DateofBirth" value={formData.DateofBirth} onChange={handleChange} required /><br />
          {errors.DateOfBirthError && <span className="error">{errors.DateOfBirthError}</span>}
        </div>
        <div>
          <label className='Addjailor-lable'>Contact Number: </label> <br />
          <input type="text" className='addjailorinputs' name="ContactNumber" value={formData.ContactNumber} onChange={handleChange} required /><br />
          {errors.ContactNumberError && <span className="error">{errors.ContactNumberError}</span>}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} >
        <div>
          <label className='Addjailor-lable'>Emergency Contact Number: </label> <br />
          <input type="text" className='addjailorinputs' name="EmergencyContactNumber" value={formData.EmergencyContactNumber} onChange={handleChange} required /><br />
          {errors.EmergencyContactNumberError && <span className="error">{errors.EmergencyContactNumberError}</span>}
        </div>
        <div>
          <label className='Addjailor-lable'>Marital Status:</label> <br />
          <select name="MaritalStatus" className='addjailorinputs' value={formData.MaritalStatus} onChange={handleChange} required>
            <option value="" disabled defaultValue>Choose an option</option>
            <option value="married">Married</option>
            <option value="unmarried">Single</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} >
        <div>
          <label className='Addjailor-lable' style={{ marginBottom: '15px' }}>Gender: </label> <br />
          <input type="radio" id="male" name="Gender" value="male" onChange={handleChange} checked={formData.Gender === "male"} required />
          <label htmlFor="male" className='radio-lable'>Male</label>
          <input type="radio" id="female" name="Gender" value="female" onChange={handleChange} checked={formData.Gender === "female"} required />
          <label htmlFor="female" className='radio-lable'>Female</label>
        </div>
        <div>
          <label className='Addjailor-lable'>Job Title :</label><br />
          <select name="jobTitle" className='addjailorinputs' onChange={handleChange} value={formData.jobTitle}>
            <option value="" disabled selected>Choose an option</option>
            <option value="CorrectionalOfficer">Correctional Officer</option>
            <option value="CorrectionalDeputy">Correctional Deputy</option>
            <option value="DetentionOfficer">Detention Officer</option>
            <option value="CorrectionalCounselor">Correctional Counselor</option>
            <option value="CorrectionalSergeant">Correctional Sergeant</option>
            <option value="CorrectionalLieutenant">Correctional Lieutenant</option>
            <option value="CorrectionalCaptain">Correctional Captain</option>
            <option value="CorrectionalAdministrator">Correctional Administrator</option>
            <option value="CorrectionalSupervisor">Correctional Supervisor</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }} >
        <div>
          <label className='Addjailor-lable'>Department :</label>
          <select name="Department" className='addjailorinputs' onChange={handleChange} value={formData.Department}>
            <option value="" disabled selected>Choose an option</option>
            <option value="Ablock">A Block (Staff Management Department)</option>
            <option value="Bblock">B Block (Inmate Management Department)</option>
            <option value="Cblock">C Block (IT Department)</option>
            <option value="Dblock">D Block (Visitor Management Department)</option>
            <option value="Eblock">E Block (Healthcare Management Department)</option>
          </select>
        </div>
        <div>
          <label className='Addjailor-lable'>Start Date: </label>
          <input type="date" name="StartDate" className='addjailorinputs' onChange={handleChange} value={formData.StartDate} /><br />
        </div>
      </div>

    </div>
  );
}

export default JailorPersonalInfo;