import React from 'react';
import '../CssFiles/AllForm.css';

const PersonalInformation = ({ visitorData, handleChange, errors }) => {

    return (
        <div>

            <h2 style={{ color: '#3C78AA', fontWeight: 'bold', textAlign: 'center', marginBottom: '15px' }}>Visitor Form</h2>

            <div className='form1'>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} >
                    <div style={{width:'370px'}}>
                        <label className='Addjailor-lable'>First Name:</label>

                        <input type="text" name="firstName" value={visitorData.firstName} onChange={handleChange} className={`addjailorinputs ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`} />
                        {errors.firstName && <span className="v-add-incident-eroor">{errors.firstName}</span>}

                    </div>
                    <div>
                        <label className='Addjailor-lable'>Last Name:</label>

                        <input type="text" name="lastName" value={visitorData.lastName} onChange={handleChange} className={`addjailorinputs ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`} />
                        {errors.lastName && <span className="v-add-incident-eroor">{errors.lastName}</span>}

                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} >
                    <div style={{width:'410px'}}>
                        <label className='Addjailor-lable'>Date of Birth:</label>

                        <input type="date" name="dateOfBirth" value={visitorData.dateOfBirth} onChange={handleChange} className={`addjailorinputs ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`} />
                        {errors.dateOfBirth && <span className="v-add-incident-eroor">{errors.dateOfBirth}</span>}

                    </div>
                    <div>
                        <label className='Addjailor-lable'>Contact Number:</label>

                        <input type="number" name="contactNumber" value={visitorData.contactNumber} onChange={handleChange} className={`addjailorinputs ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'}`} />
                        {errors.contactNumber && <span className="v-add-incident-eroor">{errors.contactNumber}</span>}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} >
                    <div style={{width:'400px'}}>
                    <label className="Addjailor-lable">Gender:</label>
                        <select name="gender" value={visitorData.gender} onChange={handleChange} className={`addjailorinputs ${errors.gender ? 'border-red-500' : 'border-gray-300'} `}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.gender && <span className="v-add-incident-eroor">{errors.gender}</span>}


                    </div>
                    <div>
                        <label className='Addjailor-lable'>Inmate Number:</label>

                        <input type="text" name="inmateNo" value={visitorData.inmateNo} onChange={handleChange} className={`addjailorinputs ${errors.inmateNo ? 'border-red-500' : 'border-gray-300'}`} />
                        {errors.inmateNo && <span className="v-add-incident-eroor">{errors.inmateNo}</span>}

                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} >
                    <div >
                        <label className='Addjailor-lable'>Inmate Name:</label>

                        <input type="text" name="inmateName" value={visitorData.inmatename} onChange={handleChange} className={`addjailorinputs ${errors.inmateName ? 'border-red-500' : 'border-gray-300'}`} />
                        {errors.inmateName && <span className="v-add-incident-eroor">{errors.inmateName}</span>}

                    </div>
                    <div>
                        <label className='Addjailor-lable'>Date of Visit:</label>
                        <div>
                            <input type="date" name="dateOfVisit" value={visitorData.dateOfVisit} onChange={handleChange} className={`addjailorinputs ${errors.dateOfVisit ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.dateOfVisit && <span className="v-add-incident-eroor">{errors.dateOfVisit}</span>}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                    <div style={{width:'400px'}}>
                        <label className='Addjailor-lable'>Time of Visit:</label>

                        <input type="time" name="timeOfVisit" value={visitorData.timeOfVisit} onChange={handleChange} className={`addjailorinputs ${errors.timeOfVisit ? 'border-red-500' : 'border-gray-300'}`} />
                        {errors.timeOfVisit && <span className="v-add-incident-eroor">{errors.timeOfVisit}</span>}

                    </div>
                    <div>
                        <label className='Addjailor-lable'>Purpose of Visit:</label>

                        <textarea maxLength="50" name="purposeOfVisit" value={visitorData.purposeOfVisit} onChange={handleChange} className={`addjailorinputs ${errors.purposeOfVisit ? 'border-red-500' : 'border-gray-300'}`} rows="3"></textarea>
                        {errors.purposeOfVisit && <span className="v-add-incident-eroor">{errors.purposeOfVisit}</span>}

                    </div>
                </div>

            </div>



        </div>
    );
};

export default PersonalInformation;
