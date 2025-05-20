import React, { useState, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import axios from "axios";
import MergedForm from '../Forms/MergedForm';
import UpdateInmate from '../Forms/UpdateInmate';
import AddWantedInmate from '../Forms/AddWantedInmate';
import AddReleasedInmate from '../Forms/AddReleasedInmate';
import InmateMedicalDetails from '../Forms/InmateMedicalDetails';
import "./CurrentInmatesStyle.css";
import SideNavbar from "../SideNavbar";
import { Pencil, Trash } from "lucide-react";


const URL = "http://localhost:3500/inmate/getcurrentinmates";

const fetchHandler = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching inmates:', error);
        return [];
    }
};

function CurrentInmate() {
    const [isVisibleAddModal, setIsVisibleAddModal] = useState(false);
    const [isVisibleProfileModal, setIsVisibleProfileModal] = useState(false);
    const [isVisibleUpdateModal, setIsVisibleUpdateModal] = useState(false);
    const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);
    const [currentInmates, setCurrentInmates] = useState([]);
    const [maleCount, setMaleCount] = useState(0);
    const [femaleCount, setFemaleCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedInmate, setSelectedInmate] = useState(null);
    const [isVisibleWantedModal, setIsVisibleWantedModal] = useState(false);
    const [isVisibleReleasedModal, setIsVisibleReleasedModal] = useState(false);
    const [isVisibleHealthcareAppointmentModal, setIsVisibleHealthcareAppointmentModal] = useState(false);
    const [selectedInmateName, setSelectedInmateName] = useState('');
    const [selectedInmateForDeletion, setSelectedInmateForDeletion] = useState(null);

    useEffect(() => {
        fetchHandler().then(data => {
            setCurrentInmates(data);
            const male = data.filter(inmate => inmate.gender === 'Male').length;
            const female = data.filter(inmate => inmate.gender === 'Female').length;
            setMaleCount(male);
            setFemaleCount(female);
        });
    }, []);

    const showAddModal = () => {
        setIsVisibleAddModal(true);
    };

    const showProfileModal = (inmate) => {
        setSelectedInmate(inmate);
        setIsVisibleProfileModal(true);
    };

    const showDeleteModal = (inmate) => {
        setSelectedInmateForDeletion(inmate);
        setIsVisibleDeleteModal(true);
    };

    const handleCancelAddModal = () => {
        setIsVisibleAddModal(false);
    };

    const handleCancelProfileModal = () => {
        setIsVisibleProfileModal(false);
    };

    const handleCancelDeleteModal = () => {
        setIsVisibleDeleteModal(false);
        setSelectedInmateForDeletion(null);
    };

    const handleUpdateClick = (inmate) => {
        setSelectedInmate(inmate);
        setIsVisibleUpdateModal(true);
    };

    const handleAddToWantedList = (inmate) => {
        setSelectedInmate(inmate);
        setIsVisibleWantedModal(true);
    };

    const handleAddToReleasedList = (inmate) => {
        setSelectedInmate(inmate);
        setIsVisibleReleasedModal(true);

    };

    const handleOpenHealthcareAppointmentModal = (inmate) => {
        setSelectedInmateName(inmate);
        setIsVisibleHealthcareAppointmentModal(true);
    };

    const handleUpdate = async (id, updatedData) => {
        try {
            await axios.put(`http://localhost:3500/inmate/${id}`, updatedData);
            message.success('Inmate details updated successfully.');
            fetchHandler().then(data => setCurrentInmates(data));
            setIsVisibleUpdateModal(false);
        } catch (error) {
            console.error('Error updating inmate details:', error);
            message.error('Failed to update inmate details.');
        }
    };

    const deleteModelHandler = async () => {
        try {
            const response = await axios.delete(`http://localhost:3500/inmate/${selectedInmateForDeletion._id}`);
            console.log('Success:', response.data);
            message.success('Inmate details deleted successfully.');
            setIsVisibleDeleteModal(false);
            fetchHandler().then(data => setCurrentInmates(data));
            setSelectedInmateForDeletion(null);
        } catch (error) {
            console.error('Error deleting inmate:', error);
            message.error('Failed to delete inmate details.');
        }
    };

    const filteredInmates = currentInmates.filter(inmate => {
        if (inmate) {
            for (let key in inmate) {
                if (inmate[key] && inmate[key].toString().toLowerCase().includes(searchQuery.toLowerCase())) {
                    return true;
                }
            }
        }
        return false;
    });


    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

            <div style={{ height: "705px", width: "20%" }}>

                <SideNavbar />

            </div>

            <div style={{ backgroundColor: "#f8f9fa", width: "80%", height: "705px" }}>


                <div className="head">
                    <h6 className="fw-bold" style={{ fontSize: "30px", marginBottom: "15px", textAlign: "left" }}>
                        Current Inmates List
                    </h6>

                </div>

                <div style={{ display: "flex", flexDirection: "row", marginBottom: "30px", marginTop: "40px" }}>

                    <div>

                        <input
                            type="text"
                            className="searchInput"
                            placeholder="Search"
                            style={{ width: "500px" }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <br />

                        <Button type='primary' onClick={showAddModal} className='addbutton'>Add Inmate</Button></div>
                    <div className="flexContent">
                        <div className="countContainer">
                            <p>Total Current Inmates:  {currentInmates.length}</p>
                            <p>Male Inmates:   {maleCount}</p>
                            <p>Female Inmates: {femaleCount}</p>
                        </div>

                    </div>
                </div>

                <Modal
                    visible={isVisibleAddModal}
                    onCancel={handleCancelAddModal}
                    footer={null}
                    width={650}
                    style={{ marginTop: -50, marginBottom: 120 }}
                >
                    <MergedForm onUpdate={() => fetchHandler().then(data => setCurrentInmates(data))}
                    onClose={handleCancelAddModal}
                    onAdd={() => {
                        fetchHandler().then(data => setCurrentInmates(data));
                      }}/>
                </Modal>

                <Modal
                    visible={isVisibleProfileModal}
                    onCancel={handleCancelProfileModal}
                    footer={null}
                    
                    width={630}
                    style={{ marginTop: -50 }}
                >
                    {selectedInmate && (
                        <div className="profileContainer">
                             <h2 style={{ color: '#3C78AA', fontWeight: 'bold', textAlign: 'center', marginBottom: '15px' }}>Inmate Profile</h2>
                            {selectedInmate.image ? (
                                <img className="image" src={`http://localhost:3500/uploads/${selectedInmate.image}`} alt="Inmate Photo" style={{ marginLeft: '230px', width: '120px', height: '150px' }} />
                            ) : (
                                'No Image Available'
                            )}
                            
                            <div className="profile-container">
                            <h3 className="subtopic1">Personal Information</h3>
                                <div className="profile-item">
                                    <strong className="profile-label">Full Name</strong>
                                    <span className="profile-value">:  {selectedInmate.fullname}</span>
                                </div>

                                <div className="profile-item">
                                    <strong className="profile-label">Date of Birth</strong>
                                    <span className="profile-value">:  {selectedInmate.birthday ? new Date(selectedInmate.birthday).toISOString().split('T')[0] : ''}</span>
                                </div>
                                <div className="profile-item">
                                    <strong className="profile-label">Gender</strong>
                                    <span className="profile-value">:  {selectedInmate.gender}</span>
                                </div>
                               
                                
                                <div className="profile-item">
                                    <strong className="profile-label">Emergency Contact Name</strong>
                                    <span className="profile-value">:  {selectedInmate.emergencycontactname}</span>
                                </div>
                                <div className="profile-item">
                                    <strong className="profile-label">Emergency Contact Number</strong>
                                    <span className="profile-value">:  {selectedInmate.emergencycontactnumber}</span>
                                </div>
                                <div className="profile-item">
                                    <strong className="profile-label">Marital Status</strong>
                                    <span className="profile-value">:  {selectedInmate.marital}</span>
                                </div>
                                
                                <h3 className="subtopic2">Admission & Release Details</h3>
                                <div className="profile-item">
                                    <strong className="profile-label">Inmate Number</strong>
                                    <span className="profile-value">:  {selectedInmate.inmatenumber}</span>
                                </div>
                                <div className="profile-item">
                                    <strong className="profile-label">Offense</strong>
                                    <span className="profile-value">:  {selectedInmate.offense}</span>
                                </div>
                                <div className="profile-item">
                                    <strong className="profile-label">Sentence</strong>
                                    <span className="profile-value">:  {selectedInmate.sentence}</span>
                                </div>
                                <div className="profile-item">
                                    <strong className="profile-label">Admission Date</strong>
                                    <span className="profile-value">:  {selectedInmate.admissionDate ? new Date(selectedInmate.admissionDate).toISOString().split('T')[0] : ''}</span>
                                </div>
                                <div className="profile-item">
                                    <strong className="profile-label">Estimated Release Date</strong>
                                    <span className="profile-value">:  {selectedInmate.releaseDate ? new Date(selectedInmate.releaseDate).toISOString().split('T')[0] : ''}</span>
                                </div>
                                
                                <div className="profile-item">
                                    <strong className="profile-label">Cell Number</strong>
                                    <span className="profile-value">:  {selectedInmate.cellNumber}</span>
                                </div>
                                
                                
                            </div>
                            <div className="bottomContainer">

                                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',marginTop:'20px' }}>

                                    <button className="wantedProfile" type="primary" onClick={() => handleOpenHealthcareAppointmentModal(selectedInmate.fullname)}>Medical Details</button>

                                    <button className="wantedProfile" onClick={() => handleAddToWantedList(selectedInmate)}>Add To Wanted List</button>

                                    <button className="releasedProfile" onClick={() => handleAddToReleasedList(selectedInmate)}>Add To Released List</button>
                                </div>

                               


                                <Modal
                                    visible={isVisibleHealthcareAppointmentModal}
                                    onCancel={() => setIsVisibleHealthcareAppointmentModal(false)}
                                    footer={null}
                                    width={500}
                                    style={{ marginTop:100, marginBottom: 120 }}
                                >
                                    <InmateMedicalDetails
                                        inmateName={selectedInmate.fullname}
                                        inmateNumber={selectedInmate.inmatenumber}
                                        onClose={() => setIsVisibleHealthcareAppointmentModal(false)}
                                    />
                                </Modal>


                                <Modal
                                    visible={isVisibleReleasedModal}
                                    onCancel={() => setIsVisibleReleasedModal(false)}
                                    footer={null}
                                    
                                    width={450}
                                    style={{ marginTop: 50, marginBottom: 20 }}
                                >
                                    <AddReleasedInmate
                                        selectedInmate={selectedInmate}
                                        updateInmate={(id, updatedData) => handleUpdate(id, updatedData)}
                                        onClose={() => setIsVisibleReleasedModal(false)}
                                        onUpdate={() => fetchHandler().then(data => setCurrentInmates(data))}
                                    />
                                </Modal>


                                <Modal
                                    visible={isVisibleWantedModal}
                                    onCancel={() => setIsVisibleWantedModal(false)}
                                    footer={null}
                                    
                                    width={450}
                                    style={{ marginTop: 60, marginBottom: 20 }}
                                >
                                    <AddWantedInmate
                                        selectedInmate={selectedInmate}
                                        updateInmate={(id, updatedData) => handleUpdate(id, updatedData)}
                                        onClose={() => setIsVisibleWantedModal(false)}
                                        onUpdate={() => fetchHandler().then(data => setCurrentInmates(data))}
                                    />
                                </Modal>

                            </div>
                        </div>
                    )}
                </Modal>

                <Modal
                    visible={isVisibleUpdateModal}
                    onCancel={() => { setIsVisibleUpdateModal(false) }}
                    footer={null}
                    
                    width={600}
                    style={{ marginTop: -90 }}
                >
                    {selectedInmate && (
                        <UpdateInmate
                            selectedInmate={selectedInmate}
                            updateInmate={(id, updatedData) => handleUpdate(id, updatedData)}
                            deleteInmate={deleteModelHandler}
                            onUpdate={(updatedData) => setSelectedInmate(updatedData)}
                            setImage={(file) => console.log('Set image:', file)}
                        />
                    )}
                </Modal>


                <Modal
                    title="Delete Inmate Details"
                    visible={isVisibleDeleteModal}
                    onCancel={handleCancelDeleteModal}
                    onOk={deleteModelHandler}
                    okText="Delete"
                    cancelText="Cancel"
                    style={{marginTop:'200px'}}
                    okButtonProps={{ style: { backgroundColor: 'red' } }}
                >
                    <p>Are you sure you want to delete this inmate?</p>
                </Modal>

                
                <table className="inmates-Table">
                    <thead className="colour">
                        <tr>
                            <th>Inmate Photo</th>
                            <th>Full Name</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                            {/* <th>Marital Status</th> */}
                            <th>Inmate Number</th>
                            <th>Offense</th>
                            <th>Sentence</th>
                            <th>Cell Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInmates.map(inmate => (
                            <tr key={inmate._id}>
                                <td onClick={() => showProfileModal(inmate)}>
                                    {inmate.image ? (
                                        <img src={`http://localhost:3500/uploads/${inmate.image}`} alt="Inmate Photo" style={{ width: '80px', height: '100px' }} />
                                    ) : (
                                        'No Image Available'
                                    )}
                                </td>
                                <td onClick={() => showProfileModal(inmate)}>{inmate.fullname}</td>
                                <td onClick={() => showProfileModal(inmate)}>{inmate.birthday ? new Date(inmate.birthday).toISOString().split('T')[0] : ''}</td>
                                <td onClick={() => showProfileModal(inmate)}>{inmate.gender}</td>
                                {/* <td onClick={() => showProfileModal(inmate)}>{inmate.marital}</td> */}
                                <td onClick={() => showProfileModal(inmate)}>{inmate.inmatenumber}</td>
                                <td onClick={() => showProfileModal(inmate)}>{inmate.offense}</td>
                                <td onClick={() => showProfileModal(inmate)}>{inmate.sentence}</td>
                                <td onClick={() => showProfileModal(inmate)}>{inmate.cellNumber}</td>
                                <td className="buttonColumn">
                                    <button className='update-inmate-button' onClick={() => handleUpdateClick(inmate)}> <Pencil size={18} /></button><br />
                                    <button className='delete-inmate-button' onClick={() => showDeleteModal(inmate)}> <Trash size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* </div> */}
            </div>
        </div>
    );
}

export default CurrentInmate;
