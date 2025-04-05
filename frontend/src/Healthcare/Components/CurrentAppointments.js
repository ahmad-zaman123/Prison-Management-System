import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HealthcareSideNavbar from "../HealthcareSideNavbar";
import "./currentAppointments.css";
import { CheckCircle, XCircle } from "lucide-react";


function CurrentAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get("http://localhost:3500/appointment/findall");
            setAppointments(response.data);
            setFilteredAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const filtered = appointments.filter(appointment =>
            (appointment.fullname && appointment.fullname.toLowerCase().includes(event.target.value.toLowerCase())) ||
            (appointment.inmatenumber && typeof appointment.inmatenumber === 'string' && appointment.inmatenumber.toLowerCase().includes(event.target.value.toLowerCase())) ||
            (appointment.reason && appointment.reason.toLowerCase().includes(event.target.value.toLowerCase())) ||
            (appointment.notes && appointment.notes.toLowerCase().includes(event.target.value.toLowerCase())) ||
            (appointment.appointmentDate && typeof appointment.appointmentDate === 'string' && appointment.appointmentDate.toLowerCase().includes(event.target.value.toLowerCase()))
        );
        setFilteredAppointments(filtered);
    };
    
    

    const currentAppointmentCount = appointments.length;

    const handleApprove = async (id) => {
        try {
            console.log("Approving appointment with ID:", id);
            await axios.put(`http://localhost:3500/appointment/update/${id}`, { action: 'Approved' });
            
            setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment._id !== id));
           
            setFilteredAppointments(prevFilteredAppointments => prevFilteredAppointments.filter(appointment => appointment._id !== id));
            alert('Appointment has been approved successfully!');
        } catch (error) {
            console.error('Error approving appointment:', error);
        }
    };
    
    
    

    const handleCancel = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to cancel this appointment?');
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:3500/appointment/delete/${id}`);
                setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment._id !== id));
                alert('Appointment has been cancelled successfully!');
            } catch (error) {
                console.error('Error cancelling appointment:', error);
            }
        }
    };

    return (

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

            <div style={{ height: "705px", width: "20%" }}>

            <HealthcareSideNavbar />

            </div>

            <div style={{ backgroundColor: "#f8f9fa", width: "80%", height: "705px" }}>


                <div className="head">
                    <h6 className="fw-bold" style={{ fontSize: "30px", marginBottom: "15px", textAlign: "left" }}>
                        Current Appointments
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
                        <th>Approve</th>
                        <th>Cancel</th>
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
                            <td>
                                <button className="approveButton" onClick={() => handleApprove(appointment._id)}><CheckCircle size={18} /></button>
                            </td>
                            <td>
                                <button className="cancelButton" onClick={() => handleCancel(appointment._id)}> <XCircle size={18} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default CurrentAppointments;
