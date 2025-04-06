import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaffMenuBar from '../StaffMenuBar';
import { Modal, Button, message, Row, Col } from 'antd';
import AddJailorForm from '../Forms/AddjailorForm';
import UpdateJailor from '../Forms/UpdateJailor';
import { Pencil, Trash } from "lucide-react";
import './JailorList.css';

const JailorList = () => {
    const [jailors, setJailors] = useState([]);
    const [filteredJailors, setFilteredJailors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [selectedJailor, setSelectedJailor] = useState(null);
    const [isVisibleJailorProfileModal, setIsVisibleJailorProfileModal] = useState(false);
    const [isVisibleJailorPDFModal, setIsVisibleJailorPDFModal] = useState(false);
    const [isVisibleDeleteJailorModal, setIsVisibleDeleteJailorModal] = useState(false);

    useEffect(() => {
        const fetchJailors = async () => {
            try {
                const response = await axios.get('http://localhost:3500/Jailors');
                setJailors(response.data);
                setFilteredJailors(response.data); // Set filtered jailors initially
            } catch (error) {
                console.error('Error fetching jailors:', error);
            }
        };
        fetchJailors();
    }, []);

    useEffect(() => {
        // Filter jailors based on search query
        const filtered = jailors.filter(jailor =>
            jailor.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            jailor.LastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            jailor.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            jailor.ContactNumber.toString().includes(searchQuery) //
        );
        setFilteredJailors(filtered);
        setNoResults(filtered.length === 0);
    }, [searchQuery, jailors]);

    const showAddModal = () => {
        setAddModalVisible(true);
    };

    const showPDFModel = (jailor) => {
        setSelectedJailor(jailor);
        setIsVisibleJailorPDFModal(true);
    }



    const handleCancel = () => {
        setModalVisible(false);
        setAddModalVisible(false);
        setIsVisibleJailorPDFModal(false);
        setSelectedJailor(null);
    };

    const handlePDFCancel = () => {
        setIsVisibleJailorPDFModal(false);
    };

    const showJailorProfileModal = (jailor) => {
        setSelectedJailor(jailor);
        setIsVisibleJailorProfileModal(true);
    };

    const ShowJailorDeleteModel = (jailor) => {
        setSelectedJailor(jailor);
        setIsVisibleDeleteJailorModal(true);
    }

    const handleCancelDeleteJailorModal = () => {
        setIsVisibleDeleteJailorModal(false);
        setSelectedJailor(null);
    }

    const updateJailor = async (id, updatedJailorData) => {
        try {
            await axios.put(`http://localhost:3500/Jailors/${id}, updatedJailorData`);
            const updatedJailors = jailors.map(jailor => {
                if (jailor._id === id) {
                    return { ...jailor, ...updatedJailorData };
                } else {
                    return jailor;
                }
            });
            setJailors(updatedJailors);
            setFilteredJailors(updatedJailors); // Update filtered jailors as well
            setModalVisible(false); // Close modal after update
            setSelectedJailor(null);
            message.success('Jailor updated successfully!'); // Display success message
        } catch (error) {
            console.error('Error updating jailor:', error);
            message.error('Failed to update jailor. Please try again later.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3500/Jailors/${selectedJailor._id}`);
            const updatedJailors = jailors.filter(jailor => jailor._id !== id);
            setJailors(updatedJailors);
            setIsVisibleDeleteJailorModal(false);
            setFilteredJailors(updatedJailors);

            message.success('Jailor deleted successfully!');
        } catch (error) {
            console.error('Error deleting jailor:', error);
            message.error('Failed to delete jailor. Please try again later.');
        }
    };

    const handleUpdate = (jailor) => {
        setSelectedJailor(jailor);
        setModalVisible(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };

    return (

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

            <div style={{ height: "705px", width: "20%" }}>

                <StaffMenuBar />

            </div>
            <div style={{ backgroundColor: "#f8f9fa", width: "80%", height: "705px" }}>


                <div className='header' >
                    <h6 className="fw-bold" style={{ fontSize: "30px", marginBottom: "15px", textAlign: "left" }}>
                        Jailors List
                    </h6>

                </div>

                <div className='all-jailor'>

                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "60px" }}>

                        <input
                            type="text"
                            className='searchBar'
                            placeholder="Search"
                            style={{ width: "500px" }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <Button type='primary' onClick={showAddModal} className='add-button' >Add Jailor</Button>
                    </div>

                    <table className="table-container">
                        <thead className="colour">
                            <tr>
                                <th>Full Name</th>
                                <th>Date of Birth</th>
                                <th>Contact Number</th>
                                <th>Gender</th>
                                <th>Job Title</th>
                                <th>Department</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {filteredJailors.map((jailor) => (
                                <tr key={jailor._id}>
                                    <td onClick={() => showJailorProfileModal(jailor)}>{jailor.FirstName} {jailor.LastName}</td>
                                    <td onClick={() => showJailorProfileModal(jailor)}>{formatDate(jailor.DateofBirth)}</td>
                                    <td onClick={() => showJailorProfileModal(jailor)}>{jailor.ContactNumber}</td>
                                    <td onClick={() => showJailorProfileModal(jailor)}>{jailor.Gender}</td>
                                    <td onClick={() => showJailorProfileModal(jailor)}>{jailor.jobTitle}</td>
                                    <td>{jailor.Department}</td>
                                    <td>
                                        <Button className='update-jailor-button' type='primary' onClick={() => handleUpdate(jailor)}> <Pencil size={18} /></Button>

                                        <Button className='delete-jailor-button' type='danger' onClick={() => ShowJailorDeleteModel(jailor)}> <Trash size={18} /> </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Modal
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                        width={600}
                    >
                        {selectedJailor && (<UpdateJailor selectedJailor={selectedJailor} updateJailor={updateJailor} onUpdate={() => { }} />)}
                    </Modal>
                    <Modal
                        visible={isAddModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                        width={600}
                    >
                        <AddJailorForm />
                    </Modal>
                    <Modal
                        visible={isVisibleJailorProfileModal}
                        onCancel={() => setIsVisibleJailorProfileModal(false)}
                        width={500}
                        footer={null}
                    >
                        {selectedJailor && (
                            <>
                                <div className='view'>
                                    <h2 style={{ color: '#3C78AA', marginBottom: '25px', fontWeight: 'bold', textAlign: 'center' }}>Jailor Profile</h2>
                                    
                                    <div style={{ display: 'flex' }}>
                                        <div className='text1' >First Name :</div>  <div className='text' > {selectedJailor.FirstName}</div>
                                    </div>
                                   
                                    <div style={{ display: 'flex' }}>
                                        <div className="text1">Last Name :</div>
                                        <div className="text">{selectedJailor.LastName}</div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="text1">Date of Birth :</div>
                                        <div className="text">{selectedJailor.DateofBirth}</div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="text1">Contact Number :</div>
                                        <div className="text">{selectedJailor.ContactNumber}</div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="text1">Emergency Contact Number :</div>
                                        <div className="text">{selectedJailor.EmergencyContactNumber}</div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="text1">Marital Status :</div>
                                        <div className="text">{selectedJailor.MaritalStatus}</div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="text1">Gender :</div>
                                        <div className="text">{selectedJailor.Gender}</div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="text1">Job Title :</div>
                                        <div className="text">{selectedJailor.jobTitle}</div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="text1">Department :</div>
                                        <div className="text">{selectedJailor.Department}</div>
                                    </div>
                                    <div style={{ display: 'flex',marginBottom:'10px' }}>
                                        <div className="text1">Start Date :</div>
                                        <div className="text">{selectedJailor.StartDate}</div>
                                    </div>



                                </div>


                            </>
                        )}
                    </Modal>
                    <Modal
                        title="Delete Jailor Details"
                        visible={isVisibleDeleteJailorModal}
                        onCancel={handleCancelDeleteJailorModal}
                        onOk={() => handleDelete(selectedJailor._id)}
                        okText="Delete"
                        cancelText="Cancel"
                        okButtonProps={{ style: { backgroundColor: 'red' } }}
                    >
                        <p>Are you sure you want to delete this jailor?</p>
                    </Modal>
                    {noResults && <p style={{ marginLeft: "50px", fontSize: "23px" }}>No results found.</p>}
                </div>
            </div>
        </div>
    );
};

export default JailorList;