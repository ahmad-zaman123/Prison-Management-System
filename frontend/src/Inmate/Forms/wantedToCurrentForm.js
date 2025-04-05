import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import "./releasedformStyle.css";

const { TextArea } = Input;


const WantedToCurrentInmate = ({ selectedInmate, updateInmate, onUpdate }) => {
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
    };

    return (
        <div className="releaseformContainer">
            <form onSubmit={handleSubmit}>
                
                <div>
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
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
                        value={updatedInmateData.foundDate}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Additional Notes */}
                <div className="textareaContainer">
                    <label htmlFor="additionalNotes">Additional Notes:</label>
                    <div className="textarea">
                        <TextArea
                            rows={4} 
                            size="fixed"
                            type="text"
                            id="additionalNotes"
                            className="additionalNotes"
                            name="additionalNotes"
                            value={updatedInmateData.additionalNotes}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <button type="submit">Add to Current Inmates List</button>
            </form>
        </div>
    );
};

export default WantedToCurrentInmate;
