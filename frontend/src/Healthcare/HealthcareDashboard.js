import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import HealthcareSideNavbar from "./HealthcareSideNavbar";
import "./healthcareDashboard.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


function HealthcareDashboard() {
    const [appointmentsData, setAppointmentsData] = useState(null);
    const [healthRecordsCount, setHealthRecordsCount] = useState(0);
    const [currentAppointmentsCount, setcurrentAppointmentsCount] = useState(0);
    const [approvedAppointmentsCount, setapprovedAppointmentsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log("Updated Appointments Data:", appointmentsData);
    }, [appointmentsData]);
    

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
    
            // Fetch all appointments
            const currentAppointmentsResponse = await axios.get("http://localhost:3500/appointment/findall");
            console.log("Raw Current Appointments Data:", currentAppointmentsResponse.data); // Debugging log
    
            const currentAppointments = currentAppointmentsResponse.data.filter(appointment => {
                return isWithinLast7Days(appointment.appointmentDate);
            });
    
            console.log("Filtered Current Appointments (Last 7 Days):", currentAppointments); // Debugging log
    
            const currentAppointmentsCount = currentAppointments.length;
            setcurrentAppointmentsCount(currentAppointmentsCount);
    
            // Fetch approved appointments
            const approvedAppointmentsResponse = await axios.get("http://localhost:3500/appointment/approved");
            console.log("Raw Approved Appointments Data:", approvedAppointmentsResponse.data); // Debugging log
    
            const approvedAppointments = approvedAppointmentsResponse.data.filter(appointment => {
                return isWithinLast7Days(appointment.appointmentDate);
            });
    
            console.log("Filtered Approved Appointments (Last 7 Days):", approvedAppointments); // Debugging log
    
            const approvedAppointmentsCount = approvedAppointments.length;
            setapprovedAppointmentsCount(approvedAppointmentsCount);
    
            // Fetch health records
            const healthRecordsResponse = await axios.get("http://localhost:3500/healthrecord/healthrecords");
            console.log("Health Records Data:", healthRecordsResponse.data); // Debugging log
    
            setHealthRecordsCount(healthRecordsResponse.data.length);
    
            // Update state
            setAppointmentsData({
                current: currentAppointmentsCount,
                approved: approvedAppointmentsCount
            });
    
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again later.');
            setLoading(false);
        }
    };



    const isWithinLast7Days = (dateString) => {
        const appointmentDate = new Date(dateString);
        const today = new Date();
        const differenceInTime = today.getTime() - appointmentDate.getTime();
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays <= 7 && differenceInDays >= 0;
    };
    

    console.log("Rendering Pie Chart with Data:", appointmentsData);

    // const chartData = appointmentsData
    // ? [appointmentsData.current || 1, appointmentsData.approved || 1]
    // : [1, 1];

    return (
        <div style={{ width: '100%', height: '720px', display: 'flex' }}>
            <div style={{ width: '20%', height: '720px' }}>
                <HealthcareSideNavbar />
            </div>
            <div style={{ width: '80%', height: '720px' }}>
                <div className='main-box'>
                    <div className="healthcare-header-box " style={{ width: "95%" }} >
                        <h2 className="healthcare-heading">Healthcare Management Dashboard</h2>
                    </div>
                </div>

                <div className="Dashboard-cards">
                    <Link to="/currentAppointments" className="healthcareitem">
                        Current Appointments : {currentAppointmentsCount}
                    </Link>
                    <Link to="/approvedAppointments" className="healthcareitem">
                        Approved Appointments : {approvedAppointmentsCount}
                    </Link>
                    <Link to="/healthRecords" className="healthcareitem">
                        Health Records : {healthRecordsCount}
                    </Link>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {appointmentsData && appointmentsData.current !== undefined && appointmentsData.approved !== undefined && (
                    <div className="pieChart">
                        <h4 className="pieChartTitle">Appointments Distribution </h4>
                        <Pie
                            style={{ height: '400px',marginLeft:'50px',marginTop:'20px' }}
                            data={{
                                labels: ['Current Appointments', 'Approved Appointments'],
                                datasets: [{
                                    data: [appointmentsData.current,appointmentsData.approved],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.6)',
                                        'rgba(54, 162, 235, 0.6)'
                                    ],
                                    borderWidth: 1,
                                }]
                            }}
                        />
                    </div>
                )}

            </div>
        </div>


    );
}

export default HealthcareDashboard;
