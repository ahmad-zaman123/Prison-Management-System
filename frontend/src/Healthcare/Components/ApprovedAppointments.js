import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'antd';
import HealthRecordForm from '../Forms/HealthRecordForm';
import HealthcareSideNavbar from "../HealthcareSideNavbar";
import "./currentAppointments.css";
import { PlusCircle } from "lucide-react";


  const fetchHandler = async () => {
    try {
        const response = await axios.get(URL);
        return response.data.Appointmentd; 
    } catch (error) {
        console.error('Error fetching inmates:', error);
        return [];
    }
};

function ApprovedAppointments() {
    const [approvedAppointments, setApprovedAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isVisibleAddModal, setIsVisibleAddModal] = useState(false);
    const [selectedInmateName, setSelectedInmateName] = useState('');

    useEffect(() => {
        fetchApprovedAppointments();
    }, []);

    const fetchApprovedAppointments = async () => {
        try {
            const response = await axios.get("http://localhost:3500/appointment/approved");
            setApprovedAppointments(response.data);
            setFilteredAppointments(response.data); // Initialize filteredAppointments with all approved appointments
        } catch (error) {
            console.error('Error fetching approved appointments:', error);
        }
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        setFilteredAppointments(
            approvedAppointments.filter(appointment => {
                const inmateNumber = typeof appointment.inmatenumber === 'string' ? appointment.inmatenumber.toLowerCase() : '';
                const fullName = appointment.fullname.toLowerCase();
                const reason = appointment.reason.toLowerCase();
                const notes = appointment.notes.toLowerCase();
                const action = appointment.action.toLowerCase();
                const appointmentDate = appointment.appointmentDate ? new Date(appointment.appointmentDate).toISOString().split('T')[0] : '';
    
                return (
                    inmateNumber.includes(searchTerm) ||
                    fullName.includes(searchTerm) ||
                    reason.includes(searchTerm) ||
                    notes.includes(searchTerm) ||
                    action.includes(searchTerm) ||
                    appointmentDate.includes(searchTerm)
                );
            })
        );
    };
    
    const showAddModal = (inmateName) => {
        setSelectedInmateName(inmateName);
        setIsVisibleAddModal(true);
    };
    

    const handleCancelAddModal = () => {
        setIsVisibleAddModal(false);
    };

    return (

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

            <div style={{ height: "705px", width: "20%" }}>

            <HealthcareSideNavbar />

            </div>

            <div style={{ backgroundColor: "#f8f9fa", width: "80%", height: "705px" }}>


                <div className="head">
                    <h6 className="fw-bold" style={{ fontSize: "30px", marginBottom: "15px", textAlign: "left" }}>
                        Approved Appointments
                    </h6>

                </div>

                <div style={{ display: "flex", flexDirection: "row", marginBottom: "0px", marginTop: "40px" }}>

                    <div>

                        <input
                            className='search-bar'
                            type="text"
                            placeholder="Search..."
                            style={{ width: "500px" }}
                            value={searchTerm}
                            onChange={handleSearch}
                        />

                        </div>
                        
                </div>

            <table className='table-container'>
                <thead className='colour'>
                    <tr>
                        <th>Full Name</th>
                        <th>Inmate Number</th>
                        <th>Reason</th>
                        <th>Appointment Date</th>
                        <th>Notes</th>
                        <th>Status</th>
                        <th>Create Health Record</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.map(appointment => (
                        <tr key={appointment._id}>
                            <td>{appointment.fullname}</td>
                            <td>{appointment.inmatenumber}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.appointmentDate ? new Date(appointment.appointmentDate).toISOString().split('T')[0] : ''}</td>
                            <td>{appointment.notes}</td>
                            <td>{appointment.action}</td>
                            <td>
                                <button type="primary" className="add" onClick={() => showAddModal(appointment.fullname)}> <PlusCircle size={18} /></button>
                                <Modal
                                    visible={isVisibleAddModal}
                                    onCancel={handleCancelAddModal}
                                    footer={null}
                                    closeIcon={<span className="close">X</span>}
                                    width={500}
                                    style={{ marginTop: -50, marginBottom: 120 }}
                                >
                                    <HealthRecordForm inmateName={selectedInmateName} />
                                </Modal>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}


export default ApprovedAppointments;