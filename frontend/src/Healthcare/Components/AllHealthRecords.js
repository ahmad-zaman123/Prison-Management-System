import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HealthcareSideNavbar from "../HealthcareSideNavbar";
import HealthRecordForm from '../Forms/HealthRecordForm';
import UpdateHealthRecordForm from '../Forms/UpdateHealthRecordForm';
import ViewHealthRecordModal from '../Forms/ViewHealthRecordModal';
import { Button, Modal, message } from 'antd';
import "./Dashboard.css";
import "./healthrecords.css";
import { Eye, Pencil, Trash } from "lucide-react";

function AllHealthRecords() {
    const [healthRecords, setHealthRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isVisibleAddModal, setIsVisibleAddModal] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [selectedInmate, setSelectedInmate] = useState(null);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [selectedRecordForView, setSelectedRecordForView] = useState(null);

    useEffect(() => {
        fetchHealthRecords();
    }, []);

    const fetchHealthRecords = async () => {
        try {
            const response = await axios.get("http://localhost:3500/healthrecord/healthrecords");
            setHealthRecords(response.data);
            setFilteredRecords(response.data);
        } catch (error) {
            console.error('Error fetching health records:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const filtered = healthRecords.filter(record =>
            record.InmateName.toLowerCase().includes(event.target.value.toLowerCase()) ||
            record.diagnosis.toLowerCase().includes(event.target.value.toLowerCase()) ||
            record.medications.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredRecords(filtered);
    };

    const showAddModal = () => {
        setIsVisibleAddModal(true);
    };

    const handleCancelAddModal = () => {
        setIsVisibleAddModal(false);
    };

    const showDeleteModal = (record) => {
        setRecordToDelete(record);
        setIsModalVisible(true);
    };

    const handleOkDeleteModal = async () => {
        try {
            const response = await axios.delete(`http://localhost:3500/healthrecord/deletehealthrecords/${recordToDelete._id}`);
            console.log('Success:', response.data);
            message.success('Health record deleted successfully');
            setIsModalVisible(false);
            fetchHealthRecords();
        } catch (error) {
            console.error('Error:', error.response.data);
            message.error('Failed to delete health record');
        }
    };

    const handleCancelDeleteModal = () => {
        setIsModalVisible(false);
    };

    const showUpdateModal = (record) => {
        setSelectedInmate(record);
        setIsUpdateModalVisible(true);
    };

    const handleCancelUpdateModal = () => {
        setIsUpdateModalVisible(false);
    };

    const showViewModal = (record) => {
        setSelectedRecordForView(record);
        setViewModalVisible(true);
    };

    const handleCancelViewModal = () => {
        setViewModalVisible(false);
    };

    return (

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

            <div style={{ height: "705px", width: "20%" }}>

                <HealthcareSideNavbar />

            </div>

            <div style={{ backgroundColor: "#f8f9fa", width: "80%", height: "705px" }}>


                <div className="head">
                    <h6 className="fw-bold" style={{ fontSize: "30px", marginBottom: "15px", textAlign: "left" }}>
                        Health Records
                    </h6>

                </div>

                <div style={{ display: "flex", flexDirection: "row", marginBottom: "0px", marginTop: "40px" }}>

                    <input
                        type="text"
                        className='search-record'
                        style={{ width: "500px" }}
                        placeholder='Search...'
                        value={searchTerm}
                        onChange={handleSearch}

                    />

                    <Button type='primary' onClick={showAddModal} className='add-record'>Add Record </Button>
                </div>
            

            <Modal
                visible={isVisibleAddModal}
                onCancel={handleCancelAddModal}
                footer={null}
                closeIcon={<span className="close">X</span>}
                width={500}
                style={{ marginTop: -50, marginBottom: 120 }}
            >
                <HealthRecordForm />
            </Modal>


            <table className='table-container '>
                <thead className='colour'>
                    <tr>
                        <th>Inmate Name</th>
                        <th>Date of Birth</th>
                        <th>Diagnosis</th>
                        <th>Medications</th>
                        <th>Notes</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRecords.map(record => (
                        <tr key={record._id}>
                            <td>{record.InmateName}</td>
                            <td>{record.dateOfBirth ? new Date(record.dateOfBirth).toISOString().split('T')[0] : ''}</td>
                            <td>{record.diagnosis}</td>
                            <td>{record.medications}</td>
                            <td>{record.notes}</td>
                            <td>{record.date ? new Date(record.date).toISOString().split('T')[0] : ''}</td>
                            <td>
                                <button className='HealthrecordView' onClick={() => showViewModal(record)}><Eye size={18} /> </button>
                                <button className='HealthrecordUpdate' onClick={() => showUpdateModal(record)}> <Pencil size={18} /> </button>
                                <button className='HealthrecordDelete' onClick={() => showDeleteModal(record)}> <Trash size={18} /> </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                title="Delete Health Record"
                visible={isModalVisible}
                onOk={handleOkDeleteModal}
                onCancel={handleCancelDeleteModal}
                style={{marginTop:'200px'}}
            >
                <p>Are you sure you want to delete this health record?</p>
            </Modal>
            <ViewHealthRecordModal
                visible={viewModalVisible}
                onCancel={handleCancelViewModal}
                record={selectedRecordForView}
            />
            <UpdateHealthRecordForm
                visible={isUpdateModalVisible}
                onCancel={handleCancelUpdateModal}
                healthRecord={selectedInmate}
                fetchHealthRecords={fetchHealthRecords}
            />
        </div>
        </div >
        
    );
}

export default AllHealthRecords;
