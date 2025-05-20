import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import "./releasedformStyle.css";

const { TextArea } = Input;

const AddReleasedInmate = ({ selectedInmate, updateInmate, onUpdate }) => {
    const navigate = useNavigate();
    const [updatedInmateData, setUpdatedInmateData] = useState({
        status: '',
        realReleaseDate: '',
        releaseReason: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any required field is empty
        if (!validateForm()) {
            return;
        }

        await updateInmate(selectedInmate._id, updatedInmateData);
        onUpdate(updatedInmateData);
        redirectToReleasedInmate();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedInmateData({ ...updatedInmateData, [name]: value });
    };

    const validateForm = () => {
        // Check if any required field is empty
        const { status, realReleaseDate, releaseReason } = updatedInmateData;
        if (!status || !realReleaseDate || !releaseReason ) {
            alert('Please fill out all required fields.');
            return false;
        }
        return true;
    };

    const redirectToReleasedInmate = () => {
        
        navigate("/released");
    };

    return (
        <div className="releaseformContainer">
            <form onSubmit={handleSubmit}>

            <h3 style={{ color: '#3C78AA', fontWeight: 'bold', textAlign: 'center', marginBottom: '25px' }}>Released Inmate Form</h3>
                
                <div>
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        style={{ height: '40px' }}
                        value={updatedInmateData.status}
                        onChange={handleInputChange}
                        required 
                    >
                        <option value="" disabled defaultValue>Select the status</option>
                        <option value="Current">Current</option>
                        <option value="Released">Released</option>
                        <option value="Wanted">Wanted</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="realReleaseDate">Real Release Date:</label>
                    <input
                        type="date"
                        id="realReleaseDate"
                        name="realReleaseDate"
                        value={updatedInmateData.realReleaseDate}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                
                <div>
                    <label htmlFor="releaseReason">Release Reason:</label>
                    <input
                        type="text"
                        id="releaseReason"
                        name="releaseReason"
                        value={updatedInmateData.releaseReason}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                
                

                <button type="submit"
                 style={{backgroundColor:'#3C78AA',width:'200px',marginTop:'20px',marginBottom:'-20px',marginLeft:'90px'}}
                >Add to Released List</button>
            </form>
        </div>
    );
};

export default AddReleasedInmate;
