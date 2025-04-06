import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaffMenuBar from '../StaffMenuBar';
import { Modal, Button, message } from 'antd';
import DoctorForm from '../Forms/DoctorForm';
import UpdateDoctor from "../Forms/UpdateDoctor"
import { Pencil, Trash } from "lucide-react";
import "./DoctorList.css"
const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isAddDoctorModalVisible, setAddDoctorModalVisible] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isVisibleDoctorProfileModal, setIsVisibleDoctorProfileModal] = useState(false);
    const [isVisibleDoctorPDFModal, setIsVisibleDoctorPDFModal] = useState(false);
    const [isVisibleDeleteDoctorModal, setIsVisibleDeleteDoctorModal] = useState(false);


    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:3500/Doctros');
                setDoctors(response.data);
                setFilteredDoctors(response.data);
            } catch (error) {
                console.error('Error fetching Doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

    useEffect(() => {
        const filtered = doctors.filter(doctor =>
            doctor.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.LastName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredDoctors(filtered);
        setNoResults(filtered.length === 0);
    }, [searchQuery, doctors]);

    const showAddModal = () => {
        setAddDoctorModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
        setAddDoctorModalVisible(false);
        setIsVisibleDoctorProfileModal(false);
        setSelectedDoctor(null);
    };

    const showDoctorProfileModal = (doctor) => {
        setSelectedDoctor(doctor);
        setIsVisibleDoctorProfileModal(true);
    };


    const ShowDoctorDeleteModel = (doctor) => {
        setSelectedDoctor(doctor);
        setIsVisibleDeleteDoctorModal(true);
    }
    const handleCancelDeleteDoctorModal = () => {
        setIsVisibleDeleteDoctorModal(false);
        setSelectedDoctor(null);
    };

    const updateDoctor = async (id, updatedDoctorData) => {
        try {
            await axios.put(`http://localhost:3500/Doctros/${id}`, updatedDoctorData);
            const updatedDoctors = doctors.map(doctor => {
                if (doctor._id === id) {
                    return { ...doctor, ...updatedDoctorData };
                } else {
                    return doctor;
                }
            });
            setDoctors(updatedDoctors);
            setFilteredDoctors(updatedDoctors);
            setModalVisible(false);
            setSelectedDoctor(null);
            message.success('Doctor updated successfully!');
        } catch (error) {
            console.error('Error updating Doctor:', error);
            message.error('Failed to update Doctor. Please try again later.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3500/Doctros/${selectedDoctor._id}`);
            const updatedDoctors = doctors.filter(doctor => doctor._id !== id);
            setDoctors(updatedDoctors);
            setFilteredDoctors(updatedDoctors);
            setIsVisibleDeleteDoctorModal(false);
            message.success('Doctor deleted successfully!');
        } catch (error) {
            console.error('Error deleting Doctor:', error);
            message.error('Failed to delete Doctor. Please try again later.');
        }
    };

    const handleUpdate = (doctor) => {
        setSelectedDoctor(doctor);
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
                <div className="head">
                    <h6 className="fw-bold" style={{ fontSize: "30px", marginBottom: "15px", textAlign: "left" }}>
                        Doctors List
                    </h6>

                </div>
                <div className='all-Doctor'>
                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "60px" }}>
                        <input
                            type="text"
                            className='searchBar'
                            placeholder="Search"
                            style={{ width: "500px" }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <Button type='primary' onClick={showAddModal} className='add-button' >Add Doctor</Button>
                    </div>



                    <table className="table-container">
                        <thead className="colour">
                            <tr>
                                <th>Full Name</th>
                                <th>Date of Birth</th>

                                <th>Contact Number</th>
                                <th>Gender</th>
                                <th>Specialty</th>
                                <th>Medical License Number</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {filteredDoctors.map((doctor) => (
                                <tr key={doctor._id}>
                                    <td onClick={() => showDoctorProfileModal(doctor)}>{doctor.FirstName} {doctor.LastName}</td>
                                    <td onClick={() => showDoctorProfileModal(doctor)}>{formatDate(doctor.DateofBirth)}</td>

                                    <td onClick={() => showDoctorProfileModal(doctor)}>{doctor.ContactNumber}</td>
                                    <td onClick={() => showDoctorProfileModal(doctor)}>{doctor.Gender}</td>
                                    <td onClick={() => showDoctorProfileModal(doctor)}>{doctor.Specialty}</td>
                                    <td onClick={() => showDoctorProfileModal(doctor)}>{doctor.MedicalLicenseNumber}</td>
                                    <td>
                                        <Button type='primary' onClick={() => handleUpdate(doctor)} className='update-Doctor-button'> <Pencil size={18} /> </Button>

                                        <Button type='danger' onClick={() => ShowDoctorDeleteModel(doctor)} className='delete-Doctor-button'> <Trash size={18} /> </Button>
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
                        {selectedDoctor && (<UpdateDoctor selectedDoctor={selectedDoctor} updateDoctor={updateDoctor} onUpdate={() => { }} />)}
                    </Modal>
                    <Modal
                        visible={isAddDoctorModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                        width={600}
                    >
                        <DoctorForm />
                    </Modal>
                    <Modal
                        visible={isVisibleDoctorProfileModal}
                        onCancel={() => setIsVisibleDoctorProfileModal(false)}
                        width={500}
                        footer={null}
                    >
                        {selectedDoctor && (
                            <>
                                <div className='view'>
                                    <h2 style={{ color: '#3C78AA', marginBottom: '25px', textAlign: 'center', fontWeight: 'bold' }}>Doctor Profile</h2>

                                    <div style={{ display: 'flex' }}>
                                        <div className="text1">Full Name :</div>
                                        <div className="text">{selectedDoctor.FirstName} {selectedDoctor.LastName}</div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="text1">Date of Birth :</div>
                                        <div className="text">{selectedDoctor.DateofBirth}</div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="text1">Contact Number :</div>
                                        <div className="text">{selectedDoctor.ContactNumber}</div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="text1">Gender :</div>
                                        <div className="text">{selectedDoctor.Gender}</div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="text1">Specialty :</div>
                                        <div className="text">{selectedDoctor.Specialty}</div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="text1">Medical License Number :</div>
                                        <div className="text">{selectedDoctor.MedicalLicenseNumber}</div>
                                    </div>
                                    
                                </div>



                            </>
                        )}
                    </Modal>

                    <Modal
                        title="Delete Doctor Details"
                        visible={isVisibleDeleteDoctorModal}
                        onCancel={handleCancelDeleteDoctorModal}
                        onOk={() => selectedDoctor && handleDelete(selectedDoctor._id)}
                        okText="Delete"
                        cancelText="Cancel"
                        okButtonProps={{ style: { backgroundColor: 'red' } }}
                    >
                        <p>Are you sure you want to delete this Doctor?</p>
                    </Modal>

                    {noResults && <p style={{ marginLeft: "50px", fontSize: "23px" }}>No results found.</p>}
                </div>
            </div>
        </div>

    );
}

export default DoctorList;
