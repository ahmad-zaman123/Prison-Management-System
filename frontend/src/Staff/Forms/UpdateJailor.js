import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./UpdateJailor.css"
function UpdateJailor({ selectedJailor, onUpdate, updateJailor }) {
  const [inputs, setInputs] = useState(selectedJailor);


  useEffect(() => {
    const fetchJailorData = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/Jailors/${selectedJailor._id}`);
        setInputs(response.data);
      } catch (error) {
        console.error('Error fetching jailor data:', error);
      }
    };
    fetchJailorData();
  }, [selectedJailor]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateJailor(selectedJailor._id, inputs);
    onUpdate(inputs);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <div>
      <div className='form-container' style={{border:'none'}}>
      <h2 style={{ color: '#3C78AA', marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}>Jailor Profile</h2>
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
        <label className='update-jailor-label'>Emergency Contact Number: </label><br />
        <input type="text" className='update-jailor-input' name="EmergencyContactNumber" value={inputs.EmergencyContactNumber} onChange={handleChange} />
          </div>
          <div>
        <label className='update-jailor-label'>Marital Status:</label><br />
        <select name="MaritalStatus" className='update-jailor-input2' value={inputs.MaritalStatus} onChange={handleChange}>
          <option value="" disabled selected>Choose an option</option>
          <option value="married">Married</option>
          <option value="unmarried">Unmarried</option>
        </select><br />
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
        <label className='update-jailor-label'>Job Title :</label><br />
        <select name="jobTitle" className='update-jailor-input' onChange={handleChange} value={inputs.jobTitle}>
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
        </select></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }} >
        <div>
        <label className='update-jailor-label'>Department :</label><br />
        <select name="Department" className='update-jailor-input2' onChange={handleChange} value={inputs.Department}>

          <option value="" disabled selected>Choose an option</option>
          <option value="Ablock">A Block (Staff Management Department)</option>
          <option value="Bblock">B Block (Inmate Management Department)</option>
          <option value="Cblock">C Block (IT Department)</option>
          <option value="Dblock">D Block (Visitor Management Department)</option>
          <option value="Eblock">E Block (Healthcare Management Department)</option>
        </select></div>
        <div>
        <label className='update-jailor-label'>Start Date: </label><br />
        <input type="date" name="StartDate" className='update-jailor-input' onChange={handleChange} value={inputs.StartDate} />
        </div>
        </div>

        <button type="submit" className='update-jailor-submit-button'>Update</button>
      </form>

      </div>
    </div>
  );
}

export default UpdateJailor;