import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
// import { useNavigate } from 'react-router-dom';
import "./releasedformStyle.css";

const { TextArea } = Input;


const WantedToCurrentInmate = ({ selectedInmate, updateInmate, onUpdate }) => {

    // const navigate = useNavigate();

    const [updatedInmateData, setUpdatedInmateData] = useState({
        status: '',
        foundDate: '',
        additionalNotes: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateInmate(selectedInmate._id, updatedInmateData);
        onUpdate(updatedInmateData);
        redirectToCurrentInmate();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedInmateData({ ...updatedInmateData, [name]: value });
    };

    const redirectToCurrentInmate = () => {
        window.location.href = '/current';
        // navigate("/current");
    };

    return (
        <div className="releaseformContainer">
            <form onSubmit={handleSubmit}>

            <h3 style={{ color: '#3C78AA', fontWeight: 'bold', textAlign: 'center', marginBottom: '25px' }}>Current Inmate Form</h3>
                
                <div>
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        style={{ height: '40px' }}
                        value={updatedInmateData.status}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled defaultValue>Select the status</option>
                        <option value="Wanted">Wanted</option>
                        <option value="Released">Released</option>
                        <option value="Current">Current</option>
                    </select>
                </div>
                {/* Found Date */}
                <div>
                    <label htmlFor="foundDate">Found Date:</label>
                    <input
                        type="date"
                        id="foundDate"
                        name="foundDate"
                        style={{ height: '40px'}}
                        value={updatedInmateData.foundDate}
                        onChange={handleInputChange}
                    />
                </div>
               

                <button
                 style={{backgroundColor:'#3C78AA',width:'230px',marginTop:'20px',marginBottom:'-20px',marginLeft:'70px'}}
                 type="submit" className='releasedProfile'>Add to Current Inmates</button>
            </form>
        </div>
    );
};

export default WantedToCurrentInmate;
