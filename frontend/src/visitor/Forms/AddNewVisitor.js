import React, { useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import PersonalInformation from './PersonalInformation';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../CssFiles/AllForm.css';

const AddNewVisitor = ({ isOpen, onClose, refreshList }) => {
  const [visitorData, setVisitorData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    inmateNo: '',
    inmateName: '',
    dateOfVisit: '',
    timeOfVisit: '',
    purposeOfVisit: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    inmateNo: '',
    inmateName: '',
    dateOfVisit: '',
    timeOfVisit: '',
    purposeOfVisit: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitorData({
      ...visitorData,
      [name]: value
    });
    // Clear the error message when the user starts typing again
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate Empty Fields
    for (const key in visitorData) {
      if (!visitorData[key]) {
        console.log(`Missing field: ${key}`);
        toast.error(`Please fill in all fields`);
        return;
      }
    }
  
    console.log("Submitting data:", visitorData);
  
    try {
      const response = await axios.post('http://localhost:3500/api/visitor/add', visitorData);
      console.log("Server Response:", response.data);
  
      if (typeof onClose === "function") {
        onClose();
      }
      if (typeof refreshList === "function") {
        refreshList();
      }
  
      toast.success('Visitor Successfully Added ', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  
      // Clear form data
      setVisitorData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        contactNumber: '',
        inmateNo: '',
        inmateName: '',
        dateOfVisit: '',
        timeOfVisit: '',
        purposeOfVisit: ''
      });
    } catch (error) {
      console.error('Error adding visitor:', error.response?.data || error.message);
      toast.error('Error adding visitor: ' + (error.response?.data?.message || error.message));
    }
  };
  


  return (
    <div className={`v-add-incident-overlay ${isOpen ? 'v-inci-show' : 'v-inci-hide'}`}>
      <div className="v-add-incident-container">
        <FaWindowClose size={25} color='red' onClick={onClose} className="v-add-incident-close" />
        <PersonalInformation visitorData={visitorData} handleChange={handleChange} errors={errors} />
        
        <div className="v-button-line">
          
            <button onClick={handleSubmit} className="Addjailor-button-submit">Submit</button>
          
        </div>
      </div>
    </div>
  );
};

export default AddNewVisitor;
