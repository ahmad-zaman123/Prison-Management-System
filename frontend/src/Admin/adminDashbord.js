import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css"
import AdminNavbar from './adminNavbar';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import moment from 'moment';
import axios from 'axios';
import { FaUserTie, FaUsers, FaUserCheck, FaUserMd } from "react-icons/fa";

function AdminDashboard() {
  const [currentInmates, setCurrentInmates] = useState([]);
  const [releasedInmates, setReleasedInmates] = useState([]);
  const [wantedInmates, setWantedInmates] = useState([]);
  const [jailors, setJailors] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const currentResponse = await axios.get('http://localhost:3500/inmate/getcurrentinmates');
      setCurrentInmates(currentResponse.data.filter(inmate => inmate.status === 'Current'));

      const releasedResponse = await axios.get('http://localhost:3500/inmate/getreleasedinmates');
      setReleasedInmates(releasedResponse.data.filter(inmate => inmate.status === 'Released'));

      const wantedResponse = await axios.get('http://localhost:3500/inmate/getwantedinmates');
      setWantedInmates(wantedResponse.data.filter(inmate => inmate.status === 'Wanted'));
    } catch (error) {
      console.error('Error fetching inmates:', error);
    }

    try {
      const jailorResponse = await axios.get('http://localhost:3500/Jailors');
      setJailors(jailorResponse.data);
    } catch (err) {
      console.error('Error Fetching Jailors:', err.message);
    }
  };

  const countByJobTitle = (jobTitle)=>{
    return jailors.filter((jailor)=>jailor.jobTitle == jobTitle).length;
  }
  const jobTitleData = {
    labels: ['CorrectionalOfficer', 'CorrectionalDeputy', 'DetentionOfficer', 'CorrectionalCounselor', 'CorrectionalSergeant', 'CorrectionalLieutenant', 'CorrectionalCaptain', 'CorrectionalAdministrator', 'CorrectionalSupervisor'],
    datasets: [
      {
        label: 'Jailor by JobTitle',
        data: [
          countByJobTitle('CorrectionalOfficer'),
          countByJobTitle('CorrectionalDeputy'),
          countByJobTitle('DetentionOfficer'),
          countByJobTitle('CorrectionalCounselor'),
          countByJobTitle('CorrectionalSergeant'),
          countByJobTitle('CorrectionalLieutenant'),
          countByJobTitle('CorrectionalCaptain'),
          countByJobTitle('CorrectionalAdministrator'),
          countByJobTitle('CorrectionalSupervisor')
        ],
        backgroundColor: [
          '#89CFF0',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FFA07A',
          '#20B2AA',
          '#9370DB',
          '#ADFF2F',
          '#BA55D3'
        ],
        hoverBackgroundColor: [
          '#89CFF0',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FFA07A',
          '#20B2AA',
          '#9370DB',
          '#ADFF2F',
          '#BA55D3'
        ],
      },
    ],
  };

  const countInmatesAddedLast7Days = inmates => {
    const today = moment().endOf('day');
    const data = Array(7).fill(0);

    inmates.forEach(inmate => {
      const admissionDate = moment(inmate.admissionDate).endOf('day');
      const daysAgo = today.diff(admissionDate, 'days');
      if (daysAgo >= 0 && daysAgo < 7) {
        data[6 - daysAgo]++;
      }
    });

    return data;
  };

  const totalCurrentInmates = currentInmates.length;
  const totalReleasedInmates = releasedInmates.length;
  const totalWantedInmates = wantedInmates.length;


  const inmatesStatusData = {
    labels: ['Current Inmates', 'Released Inmates', 'Wanted Inmates'],
    datasets: [
      {
        label: 'Total Count',
        data: [totalCurrentInmates, totalReleasedInmates, totalWantedInmates],
        backgroundColor: ['#89CFF0', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#89CFF0', '#FF6384', '#FFCE56'],
      },
    ],
  };

  const inmatesAddedData = {
    labels: [
      moment().subtract(6, 'days').format('MMM D'),
      moment().subtract(5, 'days').format('MMM D'),
      moment().subtract(4, 'days').format('MMM D'),
      moment().subtract(3, 'days').format('MMM D'),
      moment().subtract(2, 'days').format('MMM D'),
      moment().subtract(1, 'days').format('MMM D'),
      moment().format('MMM D')
    ],
    datasets: [
      {
        label: 'Inmates Added',
        data: countInmatesAddedLast7Days(currentInmates),
        backgroundColor: '#FFCE56',
      },
    ],
  };
  
  return (
    <div style={{height:'720px',display:'flex'}}>

      <div style={{width:'20%',height:'720px'}}>

        <AdminNavbar/>

      </div>
    <div className='admin-main'  style={{width:'80%',height:'700px',marginTop:'20px'}}>
        
    <div className='admin-function-set'>
  <div className='admin-main-function'>
    <Link to="/staff" className="nav-link">
      <FaUserTie style={{fontSize:"20px"}} /> Staff Management
    </Link>
  </div>
  <div className='admin-main-function'>
    <Link to="/dashboard" className="nav-link">
      <FaUsers style={{fontSize:"25px"}} /> Inmate Management
    </Link>
  </div>
  <div className='admin-main-function'>
    <Link to="/visitorDashboard" className="nav-link">
      <FaUserCheck style={{fontSize:"22px"}} /> Visitor Management
    </Link>
  </div>
  <div className='admin-main-function'>
    <Link to="/healthcareDashboard" className="nav-link">
      <FaUserMd style={{fontSize:"20px"}} /> Healthcare Management
    </Link>   
  </div>
</div>

 

    <div className="charts">
             <div className="admindashboard-chart-card-status" style={{height:'450px'}}>
              <h2 className="chart-card-status-title" style={{fontWeight:'bold'}}>Inmates Status</h2>
              <div className="admindashboard-bar-chart" ><Bar style={{marginLeft:'20px',marginTop:'40px'}} data={inmatesStatusData} /></div>
            </div>  

            <div className="admin-jailorCard"  style={{ height:'450px',boxShadow: '6px 6px 20px rgba(0, 0, 0, 0.3)'}}>
              <div className="admin-jailorChart" ><Doughnut className="circle" data={jobTitleData}/></div>
            </div>
    </div>   
         
    </div>
    </div>
  );
}

export default AdminDashboard;
