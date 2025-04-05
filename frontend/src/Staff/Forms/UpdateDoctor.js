import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./UpdateDoctor.css"

function UpdateDoctor({ selectedDoctor, onUpdate, updateDoctor }) {
    const [inputs, setInputs] = useState(selectedDoctor);

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/Doctros/${selectedDoctor._id}`);
                setInputs(response.data);
            } catch (error) {
                console.error('Error fetching jailor data:', error);
            }
        };
        fetchDoctorData();
    }, [selectedDoctor]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateDoctor(selectedDoctor._id, inputs);
        onUpdate(inputs);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    return (
        <div>
            <div className='form-container' style={{ border: 'none' }}>
                <h2 style={{ color: '#3C78AA', marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}>Doctor Profile</h2>
                <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} >
          <div>
            <label className='update-jailor-label'>First Name: </label><br />
            <input type="text" className='update-jailor-input' name="FirstName" value={inputs.FirstName} onChange={handleChange} />
          </div>
          <div>
            <label className='update-jailor-label'>Last Name: </label><br />
            <input type="text" className='update-jailor-input' name="LastName" value={inputs.LastName} onChange={handleChange} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} >
          <div>
        <label className='update-jailor-label'>Date of Birth: </label><br />
        <input type="date" className='update-jailor-input' name="DateofBirth" value={inputs.DateofBirth} onChange={handleChange} />
        </div>
        <div>
        <label className='update-jailor-label'>Contact Number: </label><br />
        <input type="text" className='update-jailor-input' name="ContactNumber" value={inputs.ContactNumber} onChange={handleChange} />
        </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} >
          <div>
          <label className='update-jailor-label' style={{marginBottom:'15px'}}>Gender: </label><br />
        <input type="radio" id="male" name="Gender" value="male" onChange={handleChange} checked={inputs.Gender === "male"} />
        <label htmlFor="male" className='radio-lable'>Male</label>
        <input type="radio" id="female" name="Gender" value="female" onChange={handleChange} checked={inputs.Gender === "female"} />
        <label htmlFor="female" className='radio-lable'>Female</label>
          </div>
          <div>
          <label htmlFor="specialty" className="Doctor-form-label">Specialty:</label>
                    <input
                        type="text"
                        id="specialty"
                        name="Specialty"
                        value={inputs.Specialty} onChange={handleChange}
                        className="update-jailor-input"
                        required
                    />
        </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }} >
          <div>
          <label htmlFor="medicalLicenseNumber" className="Doctor-form-label">Medical License Number:</label>
                    <input
                        type="text"
                        id="medicalLicenseNumber"
                        name="MedicalLicenseNumber"
                        value={inputs.MedicalLicenseNumber} onChange={handleChange}
                        className="update-jailor-input"
                        required
                    />
        </div>

        <div>
        <label className='update-jailor-label'>Start Date: </label><br />
        <input type="date" name="StartDate" className='update-jailor-input' onChange={handleChange} value={inputs.StartDate} />
        </div>
        </div>

        <button type="submit" className='update-jailor-submit-button'>Update</button>
      </form>
                
            </div>
        </div>
    )
}
export default UpdateDoctor;
