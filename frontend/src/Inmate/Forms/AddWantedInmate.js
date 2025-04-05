import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import "./releasedformStyle.css";

const { TextArea } = Input;


const AddWantedInmate = ({ selectedInmate, updateInmate, onUpdate }) => {
    const [updatedInmateData, setUpdatedInmateData] = useState({
        status: '',
        escapedDate: '',
        escapedTime: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateInmate(selectedInmate._id, updatedInmateData);
        onUpdate(updatedInmateData);
        redirectToWantedInmate();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedInmateData({ ...updatedInmateData, [name]: value });
    };

    const redirectToWantedInmate = () => {
        window.location.href = '/wanted';
    };

    return (
        <div className="releaseformContainer">
            <form onSubmit={handleSubmit}>

            <h3 style={{ color: '#3C78AA', fontWeight: 'bold', textAlign: 'center', marginBottom: '25px' }}>Wanted Inmate Form</h3>
                
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

                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between',marginBottom:'5px' }}>
                {/* Escaped Date */}
                <div style={{ width: '47%' }}>
                    <label htmlFor="escapedDate">Escaped Date:</label>
                    <input
                        type="date"
                        id="escapedDate"
                        name="escapedDate"
                        style={{ height: '40px' ,width:'170px'}}
                        value={updatedInmateData.escapedDate}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                {/* Escaped Time */}
                <div style={{ width: '47%' }}>
                    <label htmlFor="escapedTime">Escaped Time:</label>
                    <input
                        type="time"
                        id="escapedTime"
                        className="escapedTime"
                        style={{ height: '40px' ,width:'170px',border:'1px solid #ccc'}}
                        name="escapedTime"
                        value={updatedInmateData.escapedTime}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                </div>
                <button 
                style={{backgroundColor:'#3C78AA',width:'200px',marginTop:'20px',marginBottom:'-20px',marginLeft:'90px'}}
                type="submit" className='releasedProfile'>Add to Wanted List</button>
            </form>
        </div>
    );
};

export default AddWantedInmate;
