import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd'; 
import JailorPersonalInfo from './JailorPersonalInfo';
import './AddjailorForm.css'; 

function AddjailorForm() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    DateofBirth: "",  
    ContactNumber: "",
    EmergencyContactNumber: "",
    MaritalStatus: "",
    Gender: "",
    jobTitle: "",
    Department: "",
    StartDate: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Perform form submission if on the last page
      if (page === FormTitles.length - 1) {
        try {
          await axios.post("http://localhost:3500/Jailors", formData);
          console.log("Form submitted successfully!");
          setIsSubmitted(true);
        } catch (error) {
          console.error("Error:", error);
          // Optionally, you might want to inform the user that there was an error
          message.error('Error submitting form. Please try again.');
        }
      } else {
        // Proceed to the next page
        setPage(page + 1);
      }
    } else {
      // Display error message for incomplete form
      message.error('Please fill out all required fields.');
    }
  };

  const handleFormClose = () => {
    // Logic to close the form
    setIsSubmitted(false);
  };

  const FormTitles = [
    "Jailor Form"
  ];

  const PageDisplay = () => {
    if (page === 0) {
      return <JailorPersonalInfo formData={formData} setFormData={setFormData} />;
    } else {
      return ;
    }
  };

  if (isSubmitted) {
    return <div>Form submitted successfully!</div>;
  }

  const validateForm = () => {
    // Check for required fields based on the current page
    if (page === 0) {
      const requiredFields = ['FirstName', 'LastName', 'DateofBirth', 'ContactNumber', 'EmergencyContactNumber', 'MaritalStatus', 'Gender'];
      for (const field of requiredFields) {
        if (!formData[field]) {
          return false;
        }
      }
    } else {
      const requiredFields = ['jobTitle', 'Department', 'StartDate'];
      for (const field of requiredFields) {
        if (!formData[field]) {
          return false;
        }
      }
    } 
    return true;
  };

  return (
    <div className='form-Jailor'>
        <div className='form-container' style={{border:'none'}}>
          
                  <h2 style={{color: '#3C78AA',marginBottom:'30px',fontWeight:'bold',textAlign:'center'}}>{FormTitles[page]}</h2>
            
            <div className='body'>
                {PageDisplay()}
            </div>
            <div className='addjailor-footer'>
                
            <button onClick={handleSubmit} className='Addjailor-button-submit' >
                        Submit
                    </button> 
            </div>
        </div>
    </div>
);
}

export default AddjailorForm;
