import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Button, Modal, message } from 'antd';
import SideNavbar from "../SideNavbar";
import UpdateInmate from '../Forms/UpdateInmate';
import './ReleasedInmatesStyle.css';
import { Trash } from "lucide-react";

const fetchReleasedInmates = async () => {
    try {
        const response = await axios.get('http://localhost:3500/inmate/getreleasedinmates');
        return response.data;
    } catch (error) {
        console.error('Error fetching released inmates:', error);
        return [];
    }
};

function ReleasedInmates() {
    const [releasedInmates, setReleasedInmates] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedInmate, setSelectedInmate] = useState(null);
    const [maleCount, setMaleCount] = useState(0);
    const [femaleCount, setFemaleCount] = useState(0);
    const [isVisibleProfileModal, setIsVisibleProfileModal] = useState(false);

    const [isVisibleAddModal, setIsVisibleAddModal] = useState(false);
    const [isVisiblePDFModal, setIsVisiblePDFModal] = useState(false);
    const [isVisibleUpdateModal, setIsVisibleUpdateModal] = useState(false);
    const [currentInmates, setCurrentInmates] = useState([]);
    const [isVisibleCurrentModal, setIsVisibleCurrentModal] = useState(false);

    useEffect(() => {
        fetchReleasedInmates().then(data => {
            setReleasedInmates(data);
            const male = data.filter(inmate => inmate.gender === 'Male').length;
            const female = data.filter(inmate => inmate.gender === 'Female').length;
            setMaleCount(male);
            setFemaleCount(female);
        });
    }, []);

    const showProfileModal = (inmate) => {
        setSelectedInmate(inmate);
        setIsVisibleProfileModal(true);
    };

    const showPDFModal = (inmate) => {
        setSelectedInmate(inmate);
        setIsVisiblePDFModal(true);
    };

    const handleCancelProfileModal = () => {
        setIsVisibleProfileModal(false);
    };

    const handleAddToCurrentList = (inmate) => {
        setSelectedInmate(inmate);
        setIsVisibleCurrentModal(true);
    };


    const filteredInmates = releasedInmates.filter(inmate => {
        if (inmate) {
            for (let key in inmate) {
                if (inmate[key] && inmate[key].toString().toLowerCase().includes(searchQuery.toLowerCase())) {
                    return true;
                }
            }
        }
        return false;
    });

    const handleUpdate = async (id, updatedData) => {
        try {
            await axios.put(`http://localhost:3500/inmate/${id}`, updatedData);
            message.success('Inmate is added to released list successfully.');
            fetchReleasedInmates().then(data => setCurrentInmates(data));
            setIsVisibleUpdateModal(false);
        } catch (error) {
            console.error('Error updating inmate details:', error);
            message.error('Failed to update inmate details.');
        }
    };

    const deleteReleasedInmate = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this released inmate?');
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:3500/inmate/${id}`);
                const updatedReleasedInmates = releasedInmates.filter(inmate => inmate._id !== id);
                setReleasedInmates(updatedReleasedInmates);
                alert('Released inmate deleted successfully.');
            } catch (error) {
                console.error('Error deleting released inmate:', error);
                alert('Failed to delete released inmate.');
            }
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <div style={{ height: "705px", width: "20%" }}>

                <SideNavbar />

            </div>
            <div style={{ backgroundColor: "#f8f9fa", width: "80%", height: "705px" }}>


                <div className="head">
                    <h6 className="fw-bold" style={{ fontSize: "30px", marginBottom: "15px", textAlign: "left" }}>
                        Released Inmates List
                    </h6>

                </div>

                <div style={{ display: "flex", flexDirection: "row", marginBottom: "30px", marginTop: "40px" }}>

                    <div>

                        <input
                            className="releasedsearchBar"
                            type="text"
                            style={{ width: "500px" }}
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <br />

                    </div>

                    <div className="releasedcountContainer">
                        <p>Total Released Inmates: {releasedInmates.length}</p>
                        <p>Male Inmates: {maleCount}</p>
                        <p>Female Inmates: {femaleCount}</p>
                    </div>


                </div>



                <Modal
                    visible={isVisibleProfileModal}
                    onCancel={handleCancelProfileModal}
                    footer={null}
                    
                    width={630}
                    style={{ marginTop: -50 }}
                >
                    {selectedInmate && (
                        <div className="profileContainer">
                             <h2 style={{ color: '#3C78AA', fontWeight: 'bold', textAlign: 'center', marginBottom: '15px' }}>Released Inmate Profile</h2>
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
                                    <strong className="profile-label">Past Inmate Number</strong>
                                    <span className="profile-value">:  {selectedInmate.inmatenumber}</span>
                                </div>
                                <div className="profile-item">
                                    <strong className="profile-label">The Offense Commited</strong>
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
                                    <strong className="profile-label">Stayed Cell Number</strong>
                                    <span className="profile-value">:  {selectedInmate.cellNumber}</span>
                                </div>
                               
                                <div className="profile-item">
                                    <strong className="profile-label">Released Date</strong>
                                    <span className="profile-value">:  {selectedInmate.realReleaseDate ? new Date(selectedInmate.realReleaseDate).toISOString().split('T')[0] : ''}</span>
                                </div>
                                <div className="profile-item">
                                    <strong className="profile-label">Reason to Release</strong>
                                    <span className="profile-value">:  {selectedInmate.releaseReason}</span>
                                </div>
                            
                            </div>
                            
                        </div>
                    )}
                </Modal>

                <Modal
                    visible={isVisibleUpdateModal}
                    onCancel={() => { setIsVisibleUpdateModal(false) }}
                    footer={null}
                    closeIcon={<span className="closeIcon" style={{ color: 'red' }}>X</span>}
                    width={600}
                    style={{ marginTop: -50, marginBottom: 120 }}
                >
                    {selectedInmate && (
                        <UpdateInmate
                            selectedInmate={selectedInmate}
                            updateInmate={(id, updatedData) => handleUpdate(id, updatedData)}
                            deleteInmate={deleteReleasedInmate}
                            onUpdate={(updatedData) => setSelectedInmate(updatedData)}
                            setImage={(file) => console.log('Set image:', file)}
                        />
                    )}
                </Modal>

                


                <table className="inmatesTable">
                    <thead className=''>
                        <tr>
                            <th>Inmate Photo</th>
                            <th>Full Name</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                         
                            <th>Offense</th>
                            <th>Release Date</th>
                            <th>Release Reason</th>
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
                              
                                <td onClick={() => showProfileModal(inmate)}>{inmate.offense}</td>
                                <td onClick={() => showProfileModal(inmate)}>{inmate.realReleaseDate ? (
                                        new Date(inmate.realReleaseDate).toISOString().split('T')[0]
                                    ) : (
                                        ''
                                    )}</td>

                                <td onClick={() => showProfileModal(inmate)}>{inmate.releaseReason}</td>

                                {/* <td onClick={() => showProfileModal(inmate)}>{inmate.status}</td> */}
                                <td>
                                    <button className="delete" onClick={() => deleteReleasedInmate(inmate._id)}>  <Trash size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                
                                
            </div>
        </div>
    );
}

export default ReleasedInmates;
