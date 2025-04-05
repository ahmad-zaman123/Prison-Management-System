import React, { useState, useEffect } from 'react';
import { Button, Modal, message } from 'antd';
import axios from "axios";
import "../Components/CurrentInmatesStyle.css";
import AddAppointmentForm from './AddAppointmentForm';

const URL = "http://localhost:3500/healthrecord/healthrecords";

const fetchHealthRecords = async () => {
    try {
        const response = await axios.get(URL);
        return response.data; 
    } catch (error) {
        console.error('Error fetching health records:', error);
        return [];
    }
};

function InmateMedicalDetails({ inmateName, inmateNumber, selectedInmate }) {
    const [isVisibleHealthcareAppointmentModal, setIsVisibleHealthcareAppointmentModal] = useState(false);
    const [healthRecords, setHealthRecords] = useState([]);

    useEffect(() => {
        loadHealthRecords();
    }, []);

    const loadHealthRecords = async () => {
        try {
            const records = await fetchHealthRecords();
            const filteredRecords = records.filter(record => record.InmateName === inmateName);
            setHealthRecords(filteredRecords);
        } catch (error) {
            console.error('Error loading health records:', error);
        }
    };

    const handleOpenHealthcareAppointmentModal = () => {
        setIsVisibleHealthcareAppointmentModal(true);
    };

    return (
        <div className="histroryContainer">
            <h3 style={{ color: '#3C78AA', fontWeight: 'bold', textAlign: 'center', marginBottom: '25px' }}>Inmate Medical History</h3>
            <div className="profile-item">
                <strong className="profile-label">Full Name</strong>
                <span className="profile-value">: {inmateName}</span>
            </div>

            {healthRecords.length === 0 ? (
                <p>No health records found for this inmate.</p>
            ) : (
                healthRecords.map(record => (
                    <div key={record._id} className="healthRecordItem">
                        <div className="profile-item">
                            <strong className="profile-label">Diagnosis</strong>
                            <span className="profile-value">: {record.diagnosis}</span>
                        </div>
                        <div className="profile-item">
                            <strong className="profile-label">Medical Record Date</strong>
                            <span className="profile-value">: {new Date(record.date).toLocaleDateString()}</span>
                        </div><br></br>
                    </div>
                ))
            )}

            <button className="medicalAppointmentButton" style={{backgroundColor:'#3C78AA',borderRadius:'5px',marginRight:'100px'}} type="primary" onClick={handleOpenHealthcareAppointmentModal}>
                Create Medical Appointment
            </button>

            <Modal
                visible={isVisibleHealthcareAppointmentModal}
                onCancel={() => setIsVisibleHealthcareAppointmentModal(false)}
                footer={null}
                closeIcon={<span className="closeIcon" style={{ color: 'red' }}>X</span>}
                width={600}
                style={{ marginTop: -50, marginBottom: 120 }}
            >
                <AddAppointmentForm
                    inmateName={inmateName}
                    inmateNumber={inmateNumber}
                    onClose={() => setIsVisibleHealthcareAppointmentModal(false)}
                />
            </Modal>
        </div>
    );
}

export default InmateMedicalDetails;
