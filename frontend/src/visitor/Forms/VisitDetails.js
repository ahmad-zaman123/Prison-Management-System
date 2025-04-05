import React, { useEffect, useState } from 'react';
import '../CssFiles/AllForm.css';
import axios from 'axios';

const VisitDetails = ({ visitorData, handleChange, errors }) => {

    // const [inmateData, setInmateData] = useState([]);
    // const [selectedInmateName, setSelectedInmateName] = useState("");

    // const getData = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:3500/api/visit");
    //         setInmateData(response.data);
    //         console.log(response.data);
    //     } catch(e) {
    //         console.log(e);
    //     }
    // }

    // useEffect(() => {
    //     getData();
    // }, [])

    // const handleInmateNoChange = (event) => {
    //     const selectedInmateNo = event.target.value;
    //     const selectedInmate = inmateData.find(inmate => inmate.inmateNo === selectedInmateNo);
    //     if (selectedInmate) {
    //         setSelectedInmateName(selectedInmate.initialname);
    //         handleChange({ target: { name: 'inmateNo', value: selectedInmateNo } });
    //         handleChange({ target: { name: 'inmateName', value: selectedInmate.initialname } });
    //     } else {
    //         setSelectedInmateName("");
    //         handleChange(event);
    //     }
    // };

    return (
        <div>
            <h3 className='p-2 text-xl text-primary'>Visit Information</h3>
            <form>
                <div className="v-add-sec-div">
                    {/* <label className="text-gray-700">Inmate Number:</label>
                    <div>
                        <input type="text" name="inmateNo" value={visitorData.inmateNo} onChange={handleChange}  className={`border ${errors.inmateName ? 'border-red-500' : 'border-gray-300'} v-form-input`} />
                        {errors.inmateNo && <span className="v-add-incident-eroor">{errors.inmateNo}</span>}
                    </div> */}
                </div>
                <div className="v-add-sec-div">
                    {/* <label className="text-gray-700">Inmate Name:</label>
                    <div>
                        <input type="text" name="inmateName" value={visitorData.inmatename} onChange={handleChange}  className={`border ${errors.inmateName ? 'border-red-500' : 'border-gray-300'} v-form-input`} />
                        {errors.inmateName && <span className="v-add-incident-eroor">{errors.inmateName}</span>}
                    </div> */}
                </div>
                <div className="v-add-sec-div">
                    {/* <label className="text-gray-700">Date of Visit:</label>
                    <div>
                        <input type="date" name="dateOfVisit" value={visitorData.dateOfVisit} onChange={handleChange} className={`border ${errors.dateOfVisit ? 'border-red-500' : 'border-gray-300'} v-form-input`} />
                        {errors.dateOfVisit && <span className="v-add-incident-eroor">{errors.dateOfVisit}</span>}
                    </div> */}
                </div>
                <div className="v-add-sec-div">
                    {/* <label className="text-gray-700">Time of Visit:</label>
                    <div>
                        <input type="time" name="timeOfVisit" value={visitorData.timeOfVisit} onChange={handleChange} className={`border ${errors.timeOfVisit ? 'border-red-500' : 'border-gray-300'} v-form-input`} />
                        {errors.timeOfVisit && <span className="v-add-incident-eroor">{errors.timeOfVisit}</span>}
                    </div> */}
                </div>
                <div className="v-add-sec-div">
                    <label className="text-gray-700">Purpose of Visit:</label>
                    <div>
                        <textarea maxLength="50" name="purposeOfVisit" value={visitorData.purposeOfVisit} onChange={handleChange} className={`border ${errors.purposeOfVisit ? 'border-red-500' : 'border-gray-300'} v-form-input`} rows="3"></textarea>
                        {errors.purposeOfVisit && <span className="v-add-incident-eroor">{errors.purposeOfVisit}</span>}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default VisitDetails;






