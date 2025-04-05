import React, { useState, useEffect } from 'react';
import { Form, Input, Checkbox, Select } from 'antd';
import './updateInmateStyle.css';

const { TextArea } = Input;
const { Option } = Select;

const UpdateInmate = ({ selectedInmate, updateInmate, onUpdate }) => {
    const [updatedInmateData, setUpdatedInmateData] = useState(selectedInmate);
    const [lifeImprisonment, setLifeImprisonment] = useState(false);

    useEffect(() => {
        // Format date values before setting the state
        const formattedSelectedInmate = {
            ...selectedInmate,
            birthday: selectedInmate.birthday ? selectedInmate.birthday.split('T')[0] : null,
            admissionDate: selectedInmate.admissionDate ? selectedInmate.admissionDate.split('T')[0] : null,
            releaseDate: selectedInmate.releaseDate ? selectedInmate.releaseDate.split('T')[0] : null
        };
        setUpdatedInmateData(formattedSelectedInmate);
    }, [selectedInmate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateInmate(selectedInmate._id, updatedInmateData);
        onUpdate(updatedInmateData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedInmateData({ ...updatedInmateData, [name]: value });
    };

    const handleLifeImprisonmentChange = (e) => {
        const isChecked = e.target.checked;
        setLifeImprisonment(isChecked);
        if (isChecked) {
            // If checkbox is checked, hide the release date input field and set its value to null
            setUpdatedInmateData({ ...updatedInmateData, releaseDate: null });
        }
    };


    return (
        <div className="updateinmatecontainer">
            <form onSubmit={handleSubmit}>
                <h2 style={{ color: '#3C78AA', fontWeight: 'bold', textAlign: 'center', marginBottom: '25px' }}>Inmate Profile</h2>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between',marginBottom:'5px' }}>


                    <div style={{ width: '47%' }}>
                        <label htmlFor="fullname">Full Name:</label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            className="InputFields"
                            value={updatedInmateData.fullname}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div style={{ width: '47%' }} >
                        <label htmlFor="birthday">Date of Birth:</label>
                        <input
                            type="date"
                            id="birthday"
                            name="birthday"
                            className="InputField"
                            value={updatedInmateData.birthday}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between',marginBottom:'5px' }}>
                    <div style={{ width: '47%' }}>
                        <label htmlFor="gender">Gender:</label>
                        <select
                            id="gender"
                            name="gender"
                            style={{ height: '40px' }}
                            value={updatedInmateData.gender}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>


                    <div style={{ width: '47%' }}>
                        <label htmlFor="emergencycontactname">Emergency Contact Name:</label>
                        <input
                            type="text"
                            id="emergencycontactname"
                            name="emergencycontactname"
                            value={updatedInmateData.emergencycontactname}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between',marginBottom:'5px' }}>
                    <div style={{ width: '47%' }}>
                        <label htmlFor="emergencycontactnumber">Emergency Contact Number:</label>
                        <input
                            type="text"
                            id="emergencycontactnumber"
                            name="emergencycontactnumber"
                            value={updatedInmateData.emergencycontactnumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div style={{ width: '47%' }}>
                        <label htmlFor="marital">Marital Status:</label>
                        <select
                            id="marital"
                            name="marital"
                            value={updatedInmateData.marital}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>

                        </select>
                    </div>
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between',marginBottom:'5px' }}>
                    <div style={{ width: '47%' }}>
                        <label htmlFor="inmatenumber">Inmate Number:</label>
                        <input
                            type="text"
                            id="inmatenumber"
                            name="inmatenumber"
                            value={updatedInmateData.inmatenumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div style={{ width: '47%' }}>
                        <label htmlFor="Offense">Offense:</label>
                        <select
                            id="Offense"
                            style={{ height: '40px' }}
                            name="Offense"
                            value={updatedInmateData.Offense}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="Theft">Theft</option>
                            <option value="Abuse">Abuse</option>
                            <option value="Assault">Assault</option>
                            <option value="Murder">Murder</option>
                        </select>
                    </div>
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between',marginBottom:'5px' }}>
                    <div style={{ width: '47%' }}>
                        <label htmlFor="sentence">Sentence:</label>
                        {lifeImprisonment ? (
                            <span>Life Imprisonment</span>
                        ) : (
                            <select
                                id="sentence"
                                name="sentence"
                                style={{ height: '40px' }}
                                value={updatedInmateData.sentence}
                                onChange={handleInputChange}
                                required
                            >
                                
                                <option value="Life Imprisonment">Life Imprisonment</option>
                                <option value="Death Penalty">Death Penalty</option>
                                <option value="Probation">Probation</option>
                                <option value="Other">Other</option>
                                
                            </select>
                        )}


                    </div>

                    <div style={{ width: '47%' }}>
                        <label htmlFor="admissionDate">Admission Date:</label>
                        <input
                            type="date"
                            id="admissionDate"
                            name="admissionDate"
                            value={updatedInmateData.admissionDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '47%' }}>
                        <label htmlFor="releaseDate">Release Date:</label>
                        <input
                            type="date"
                            id="releaseDate"
                            name="releaseDate"
                            value={updatedInmateData.releaseDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>



                    <div style={{ width: '47%' }}>
                        <label htmlFor="cellNumber">Cell Number:</label>
                        <select
                            id="cellNumber"
                            name="cellNumber"
                            value={updatedInmateData.cellNumber}
                            style={{ height: '40px' }}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="A1">A1</option>
                            <option value="A2">A2</option>
                            <option value="A3">A3</option>
                            <option value="B1">B1</option>
                            <option value="B2">B2</option>
                            <option value="B3">B3</option>
                            <option value="C1">C1</option>
                            <option value="C2">C2</option>
                            <option value="C3">C3</option>

                        </select>
                    </div>
                </div>

                <button type="submit" className="update_Btn">UPDATE</button>
            </form>
        </div>
    );
};

export default UpdateInmate;
