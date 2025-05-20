import React, { useState } from 'react';
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import { message, Progress } from 'antd';
import AddCurrentAdmission from '../Forms/AddCurrentAdmission';
import AddCurrentInmate from '../Forms/AddCurrentInmate';

function MergedForm({ onClose,onAdd }) {

    // const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [image, setImage] = useState("");
    const [formData, setFormData] = useState({
        image:"",
        fullname: "",
        birthday: "",
        gender: "",
        emergencycontactname: "",
        emergencycontactnumber: "",
        marital: "",
        inmatenumber:"",
        offense: "",
        sentence: "",
        admissionDate: "",
        releaseDate: "",
        cellNumber: "",
        medicalConditions: "",
        realReleaseDate: "",
        releaseReason: "",
        releaseBy: "",
        confirmReleased: "",
        status: "",
        escapedDate: "",
        escapedTime: "",
        escapedLocation: "",
        physicalDescription: "",
        clothingDescription: "",
        foundDate: ""
    });

        // Validation function to check if all required fields are filled
        const validateForm = () => {
            // Check for required fields based on the current page
            if (page === 0) {
                const requiredFields = ['fullname', 'birthday', 'gender', 'emergencycontactname', 'emergencycontactnumber', 'marital'];
                for (const field of requiredFields) {
                    if (!formData[field]) {
                        return false; 
                    }
                }
            } else {
                const requiredFields = ['inmatenumber', 'offense', 'sentence', 'admissionDate'];
                for (const field of requiredFields) {
                    if (!formData[field]) {
                        return false; 
                    }
                }
            }
            return true; 
        };

        // Handle form submission

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Perform form submission if on the last page
            if (page === 1) {
                try {
                    // Your form submission logic
                    const formDataToSend = new FormData();
                    formDataToSend.append('image', image); 
                    for (const key in formData) {
                        if (key === 'status') {
                            formDataToSend.append(key, 'Current');
                        } else {
                            formDataToSend.append(key, formData[key]);
                        }
                    }
                    await axios.post("http://localhost:3500/inmate/addinmates", formDataToSend);
                    message.success('New inmate added successfully.');
                    if (onAdd) onAdd();
                    // window.location.href = '/current';
                    if (onClose) onClose();
                    // navigate("/current");
                } catch (error) {
                    // Handle errors
                    message.error('Failed to add the new inmate.');
                    console.error('Error:', error);
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


    

    const PageDisplay = () => {
        if (page === 0) {
            return <AddCurrentInmate formData={formData} setFormData={setFormData} setImage={setImage} />;
        } else {
            return <AddCurrentAdmission formData={formData} setFormData={setFormData} />;
        }
    };

    return (
        <div className="mergedform" style={{ width: 620, padding: '30px'}}>
            <h2 style={{ color: '#3C78AA', fontWeight: 'bold', textAlign: 'center', marginBottom: '25px' }}>Inmate Form</h2>
            
            <div className="form_container">
                
                <div className="formcontent">{PageDisplay()}</div>
                <div className="bottombuttons">
                    <button className="rightbutton"
                        disabled={page === 0}
                        style={{backgroundColor:'#3C78AA',borderRadius:'4px'}}
                        onClick={() => setPage(page - 1) }>
                        Previous
                    </button>
                    <button className="leftbutton" style={{ marginRight: 140,backgroundColor:'#3C78AA',borderRadius:'4px'}}
                        onClick={(e) => handleSubmit(e)}>
                        {page === 1 ? "Submit" : "Next"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MergedForm;
